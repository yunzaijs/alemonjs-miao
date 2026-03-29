/**
 * 原神/星铁 抽卡记录 API + Redis 存储
 */
import { getIoRedis } from '@alemonjs/db';
import { getCharacterFace } from '@src/assets/character/index.js';

// ─── Redis Keys ──────────────────────────────────────

const GACHA_KEY_PREFIX = 'data:miao:gacha';

function gachaListKey(uid: string, game: string, gachaType: number) {
  return `${GACHA_KEY_PREFIX}:${game}:${uid}:${gachaType}`;
}

function gachaAuthKeyKey(uid: string) {
  return `${GACHA_KEY_PREFIX}:authkey:${uid}`;
}

// ─── 抽卡记录数据结构 ────────────────────────────────

export interface GachaItem {
  id: string;
  name: string;
  itemType: string; // "角色" | "武器" | "光锥"
  rankType: number; // 3 | 4 | 5
  gachaType: number;
  time: string; // YYYY-MM-DD HH:mm:ss
}

// ─── 卡池类型 ────────────────────────────────────────

export const GS_GACHA_TYPES: Record<number, string> = {
  301: '角色活动祈愿',
  302: '武器活动祈愿',
  200: '常驻祈愿',
  500: '集录祈愿'
};

export const SR_GACHA_TYPES: Record<number, string> = {
  11: '角色活动跃迁',
  12: '光锥活动跃迁',
  1: '常驻跃迁',
  21: '联动角色跃迁',
  22: '联动光锥跃迁'
};

// ─── AuthKey 管理 ────────────────────────────────────

/** 从用户发送的 URL 中提取 authkey */
export function extractAuthKey(text: string): string | null {
  const match = text.match(/authkey=([^&]+)/);

  if (!match) {
    return null;
  }

  return decodeURIComponent(match[1]);
}

/** 保存 authkey 到 Redis (有效期 24 小时) */
export async function saveAuthKey(uid: string, authkey: string): Promise<void> {
  const redis = getIoRedis();

  await redis.setex(gachaAuthKeyKey(uid), 86400, authkey);
}

/** 读取 authkey */
export function getAuthKey(uid: string): Promise<string | null> {
  const redis = getIoRedis();

  return redis.get(gachaAuthKeyKey(uid));
}

// ─── 抽卡记录 API ────────────────────────────────────

const GS_GACHA_API = 'https://public-operation-hk4e-sg.hoyoverse.com/gacha_info/api/getGachaLog';
const SR_GACHA_API = 'https://api-os-takumi.mihoyo.com/common/gacha_record/api/getGachaLog';

interface GachaLogResponse {
  retcode: number;
  message: string;
  data: {
    page: string;
    size: string;
    list: {
      uid: string;
      gacha_type: string;
      item_id: string;
      count: string;
      time: string;
      name: string;
      lang: string;
      item_type: string;
      rank_type: string;
      id: string;
    }[];
    region: string;
    region_time_zone: number;
  } | null;
}

/** 从 API 拉取抽卡记录 (单页) */
async function fetchGachaPage(authkey: string, gachaType: number, endId: string, game: string): Promise<GachaItem[]> {
  const baseUrl = game === 'sr' ? SR_GACHA_API : GS_GACHA_API;
  const gameBiz = game === 'sr' ? 'hkrpg_global' : 'hk4e_global';

  const params = new URLSearchParams({
    authkey_ver: '1',
    sign_type: '2',
    auth_appid: 'webview_gacha',
    gacha_type: String(gachaType),
    page: '1',
    size: '20',
    end_id: endId,
    game_biz: gameBiz,
    lang: 'zh-cn',
    authkey
  });

  const url = `${baseUrl}?${params.toString()}`;

  const resp = await fetch(url);
  const json = (await resp.json()) as GachaLogResponse;

  if (json.retcode !== 0 || !json.data) {
    if (json.retcode === -101) {
      throw new Error('authkey 已过期，请重新获取');
    }

    throw new Error(json.message || `API 错误: ${json.retcode}`);
  }

  return json.data.list.map(item => ({
    id: item.id,
    name: item.name,
    itemType: item.item_type,
    rankType: Number(item.rank_type),
    gachaType: Number(item.gacha_type),
    time: item.time
  }));
}

/** 获取某个卡池的全部记录 (分页拉取) */
export async function fetchAllGachaLogs(authkey: string, gachaType: number, game: string): Promise<GachaItem[]> {
  const allItems: GachaItem[] = [];
  let endId = '0';

  for (let i = 0; i < 100; i++) {
    const page = await fetchGachaPage(authkey, gachaType, endId, game);

    if (page.length === 0) {
      break;
    }
    allItems.push(...page);
    endId = page[page.length - 1].id;

    // 限速: 每页间隔 300ms
    await new Promise(r => setTimeout(r, 300));
  }

  return allItems;
}

// ─── Redis 存储 ──────────────────────────────────────

/** 保存抽卡记录到 Redis */
export async function saveGachaLogs(uid: string, game: string, gachaType: number, items: GachaItem[]): Promise<void> {
  const redis = getIoRedis();
  const key = gachaListKey(uid, game, gachaType);

  // 合并已有数据 (去重)
  const existing = await loadGachaLogs(uid, game, gachaType);
  const idSet = new Set(existing.map(e => e.id));
  const merged = [...existing];

  for (const item of items) {
    if (!idSet.has(item.id)) {
      merged.push(item);
      idSet.add(item.id);
    }
  }

  // 按 ID 降序排列 (新的在前)
  merged.sort((a, b) => (BigInt(b.id) > BigInt(a.id) ? 1 : -1));

  // 存储，不设过期时间（永久保存）
  await redis.set(key, JSON.stringify(merged));
}

/** 读取 Redis 中的抽卡记录 */
export async function loadGachaLogs(uid: string, game: string, gachaType: number): Promise<GachaItem[]> {
  const redis = getIoRedis();
  const key = gachaListKey(uid, game, gachaType);
  const raw = await redis.get(key);

  if (!raw) {
    return [];
  }

  return JSON.parse(raw) as GachaItem[];
}

// ─── 数据分析 ────────────────────────────────────────

export interface GachaAnalysis {
  gachaType: number;
  gachaTypeName: string;
  totalCount: number;
  fiveStarCount: number;
  fourStarCount: number;
  threeStarCount: number;
  /** 距上次五星已抽数 */
  pityCount: number;
  /** 平均出金抽数 */
  fiveStarAvg: number;
  /** 五星列表 (新→旧) */
  fiveStarList: {
    name: string;
    count: number; // 本次花了多少抽
    time: string;
    faceImg?: string;
    rarity: number;
  }[];
}

/** 分析一个卡池的抽卡数据 */
export function analyzeGacha(items: GachaItem[], gachaType: number, game: string): GachaAnalysis {
  const typeName = game === 'sr' ? (SR_GACHA_TYPES[gachaType] ?? `池${gachaType}`) : (GS_GACHA_TYPES[gachaType] ?? `池${gachaType}`);

  // items 按 id 降序 (新的在前)
  const sorted = [...items].sort((a, b) => (BigInt(b.id) > BigInt(a.id) ? 1 : -1));

  let fiveCount = 0;
  let fourCount = 0;
  let threeCount = 0;
  let pityCount = 0;

  const fiveStarList: GachaAnalysis['fiveStarList'] = [];
  let countSinceLast = 0;

  // 从旧到新遍历来计算每个五星的抽数
  const reversed = [...sorted].reverse();

  for (const item of reversed) {
    countSinceLast++;

    if (item.rankType === 5) {
      fiveCount++;
      fiveStarList.push({
        name: item.name,
        count: countSinceLast,
        time: item.time,
        faceImg: getCharacterFace(game as 'gs' | 'sr', item.name),
        rarity: 5
      });
      countSinceLast = 0;
    } else if (item.rankType === 4) {
      fourCount++;
    } else {
      threeCount++;
    }
  }

  // pityCount = 从最新记录到上一个五星的抽数
  pityCount = countSinceLast;

  // 反转 fiveStarList 使新的在前
  fiveStarList.reverse();

  const fiveStarAvg = fiveCount > 0 ? Math.round((sorted.length - pityCount) / fiveCount) : 0;

  return {
    gachaType,
    gachaTypeName: typeName,
    totalCount: sorted.length,
    fiveStarCount: fiveCount,
    fourStarCount: fourCount,
    threeStarCount: threeCount,
    pityCount,
    fiveStarAvg,
    fiveStarList
  };
}

/** 获取全部卡池的汇总统计 */
export async function analyzeAllGacha(
  uid: string,
  game: string
): Promise<{
  analyses: GachaAnalysis[];
  totalCount: number;
  totalFive: number;
  totalFour: number;
}> {
  const types = game === 'sr' ? [11, 12, 1] : [301, 302, 200, 500];
  const analyses: GachaAnalysis[] = [];
  let totalCount = 0;
  let totalFive = 0;
  let totalFour = 0;

  for (const t of types) {
    const items = await loadGachaLogs(uid, game, t);

    if (items.length > 0) {
      const analysis = analyzeGacha(items, t, game);

      analyses.push(analysis);
      totalCount += analysis.totalCount;
      totalFive += analysis.fiveStarCount;
      totalFour += analysis.fourStarCount;
    }
  }

  return { analyses, totalCount, totalFive, totalFour };
}
