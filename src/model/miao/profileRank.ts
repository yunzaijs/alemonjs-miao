/**
 * 群内排名系统 — 基于 Redis Sorted Set
 *
 * 排名维度:
 * - mark: 圣遗物总评分
 * - crit: 双爆副词条合计
 *
 * Key 格式: data:alemonjs-miao:rank:{guildId}:{type}:{charId}
 * 配置 Key: data:alemonjs-miao:rank:{guildId}:cfg
 */
import { getIoRedis } from '@alemonjs/db';
import { scoreCharacterArtifacts } from './artisMark';
import type { ProfileAvatar } from './enka';

const RANK_PREFIX = 'data:alemonjs-miao:rank';
const RANK_TTL = 365 * 24 * 3600; // 365 天

// ─── Key 生成 ────────────────────────────────────────

function rankKey(guildId: string, type: string, charId: number): string {
  return `${RANK_PREFIX}:${guildId}:${type}:${charId}`;
}

function cfgKey(guildId: string): string {
  return `${RANK_PREFIX}:${guildId}:cfg`;
}

// ─── 排名配置 ────────────────────────────────────────

export interface RankConfig {
  status: number; // 0=开启, 1=关闭
  number: number; // 排行榜人数 (5-30)
}

const DEFAULT_CFG: RankConfig = {
  status: 0,
  number: 15
};

export async function getRankConfig(guildId: string): Promise<RankConfig> {
  const redis = getIoRedis();

  if (!redis) {
    return DEFAULT_CFG;
  }

  const raw = await redis.get(cfgKey(guildId));

  if (!raw) {
    return DEFAULT_CFG;
  }

  return JSON.parse(raw) as RankConfig;
}

export async function setRankConfig(guildId: string, cfg: Partial<RankConfig>): Promise<void> {
  const redis = getIoRedis();

  if (!redis) {
    return;
  }

  const current = await getRankConfig(guildId);
  const merged = { ...current, ...cfg };

  await redis.set(cfgKey(guildId), JSON.stringify(merged), 'EX', RANK_TTL);
}

// ─── 排名值计算 ──────────────────────────────────────

export interface RankValue {
  mark: number; // 圣遗物总分
  crit: number; // 双爆合计
}

/** 计算角色的排名值 */
export function calcRankValues(avatar: ProfileAvatar): RankValue {
  const artScore = scoreCharacterArtifacts(avatar);

  // 双爆：从属性面板取暴击率+暴击伤害
  let critRate = 0;
  let critDmg = 0;

  if (avatar.stats) {
    for (const stat of avatar.stats) {
      if (stat.key === 'critRate' || stat.name === '暴击率') {
        critRate = parseFloat(stat.value.replace('%', '')) || 0;
      }

      if (stat.key === 'critDmg' || stat.name === '暴击伤害') {
        critDmg = parseFloat(stat.value.replace('%', '')) || 0;
      }
    }
  }

  return {
    mark: artScore.totalMark,
    crit: Math.round((critRate + critDmg) * 10) / 10
  };
}

// ─── 排名数据操作 ────────────────────────────────────

export interface RankEntry {
  uid: string;
  score: number;
  rank: number; // 1-based
}

/**
 * 提交角色排名数据
 */
export async function submitRank(guildId: string, uid: string, avatar: ProfileAvatar): Promise<void> {
  const redis = getIoRedis();

  if (!redis) {
    return;
  }

  const values = calcRankValues(avatar);
  const charId = avatar.id;

  // mark 排名
  const mkKey = rankKey(guildId, 'mark', charId);

  await redis.zadd(mkKey, values.mark, uid);
  await redis.expire(mkKey, RANK_TTL);

  // crit 排名
  const crKey = rankKey(guildId, 'crit', charId);

  await redis.zadd(crKey, values.crit, uid);
  await redis.expire(crKey, RANK_TTL);
}

/**
 * 批量提交一个用户的所有角色排名
 */
export async function submitAllRanks(guildId: string, uid: string, avatars: ProfileAvatar[]): Promise<void> {
  for (const avatar of avatars) {
    if (avatar.artifacts && avatar.artifacts.length > 0) {
      await submitRank(guildId, uid, avatar);
    }
  }
}

/**
 * 查询某个角色的排行榜
 * @param type 'mark' | 'crit'
 * @param limit 返回前 N 名
 */
export async function getRankList(guildId: string, type: string, charId: number, limit: number): Promise<RankEntry[]> {
  const redis = getIoRedis();

  if (!redis) {
    return [];
  }

  const key = rankKey(guildId, type, charId);
  // ZREVRANGE 获取降序排名 (高分在前)
  const results = await redis.zrevrange(key, 0, limit - 1, 'WITHSCORES');

  const entries: RankEntry[] = [];

  for (let i = 0; i < results.length; i += 2) {
    entries.push({
      uid: results[i],
      score: parseFloat(results[i + 1]),
      rank: Math.floor(i / 2) + 1
    });
  }

  return entries;
}

/**
 * 查询某个角色的最强用户 (排名第一)
 */
export async function getGroupTop(guildId: string, type: string, charId: number): Promise<RankEntry | null> {
  const list = await getRankList(guildId, type, charId, 1);

  return list[0] ?? null;
}

/**
 * 查询指定用户在某角色的排名
 */
export async function getUserRank(guildId: string, type: string, charId: number, uid: string): Promise<RankEntry | null> {
  const redis = getIoRedis();

  if (!redis) {
    return null;
  }

  const key = rankKey(guildId, type, charId);
  const rank = await redis.zrevrank(key, uid);

  if (rank === null) {
    return null;
  }

  const score = await redis.zscore(key, uid);

  return {
    uid,
    score: parseFloat(score ?? '0'),
    rank: rank + 1
  };
}

/**
 * 重置某角色或全部排名
 * @param charId 传 null 时重置全部
 */
export async function resetRank(guildId: string, charId: number | null): Promise<number> {
  const redis = getIoRedis();

  if (!redis) {
    return 0;
  }

  if (charId !== null) {
    const keys = [rankKey(guildId, 'mark', charId), rankKey(guildId, 'crit', charId)];

    let count = 0;

    for (const k of keys) {
      count += await redis.del(k);
    }

    return count;
  }

  // 全部重置：扫描所有 rank keys
  const pattern = `${RANK_PREFIX}:${guildId}:*`;
  let cursor = '0';
  let totalDeleted = 0;

  do {
    const [nextCursor, keys] = await redis.scan(cursor, 'MATCH', pattern, 'COUNT', 100);

    cursor = nextCursor;

    if (keys.length > 0) {
      totalDeleted += await redis.del(...keys);
    }
  } while (cursor !== '0');

  return totalDeleted;
}
