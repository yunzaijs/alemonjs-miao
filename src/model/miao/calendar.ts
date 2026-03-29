/**
 * 日历模块 — 解析米游社公告获取活动/素材日程
 */
import { getIoRedis } from '@alemonjs/db';
import dayjs from 'dayjs';

// ─── 公告 API 配置 ──────────────────────────────────

interface AnnConfig {
  listUrl: string;
  detailUrl: string;
}

const ANN_API: Record<string, AnnConfig> = {
  gs: {
    listUrl:
      'https://hk4e-api.mihoyo.com/common/hk4e_cn/announcement/api/getAnnList?game=hk4e&game_biz=hk4e_cn&lang=zh-cn&bundle_id=hk4e_cn&level=60&platform=pc&region=cn_gf01&uid=100000000',
    detailUrl:
      'https://hk4e-api.mihoyo.com/common/hk4e_cn/announcement/api/getAnnContent?game=hk4e&game_biz=hk4e_cn&lang=zh-cn&bundle_id=hk4e_cn&level=60&platform=pc&region=cn_gf01&uid=100000000'
  },
  sr: {
    listUrl:
      'https://hkrpg-api.mihoyo.com/common/hkrpg_cn/announcement/api/getAnnList?game=hkrpg&game_biz=hkrpg_cn&lang=zh-cn&bundle_id=hkrpg_cn&level=70&platform=pc&region=prod_gf_cn&uid=100000000',
    detailUrl:
      'https://hkrpg-api-static.mihoyo.com/common/hkrpg_cn/announcement/api/getAnnContent?game=hkrpg&game_biz=hkrpg_cn&lang=zh-cn&bundle_id=hkrpg_cn&level=70&platform=pc&region=prod_gf_cn&uid=100000000'
  },
  zzz: {
    listUrl:
      'https://announcement-api.mihoyo.com/common/nap_cn/announcement/api/getAnnList?game=nap&game_biz=nap_cn&lang=zh-cn&bundle_id=nap_cn&level=60&platform=pc&region=prod_gf_cn&uid=100000000',
    detailUrl:
      'https://announcement-static.mihoyo.com/common/nap_cn/announcement/api/getAnnContent?game=nap&game_biz=nap_cn&lang=zh-cn&bundle_id=nap_cn&level=60&platform=pc&region=prod_gf_cn&uid=100000000'
  }
};

// ─── 数据结构 ────────────────────────────────────────

export interface CalendarActivity {
  id: number;
  title: string;
  type: 'character' | 'weapon' | 'activity' | 'abyss' | 'pass' | 'other';
  banner: string;
  icon: string;
  startTime: string;
  endTime: string;
  isActive: boolean;
  remaining: string;
}

export interface CalendarData {
  game: string;
  gameName: string;
  activities: CalendarActivity[];
  now: string;
}

// ─── 忽略的公告 ──────────────────────────────────────

const IGNORE_TITLE_REG = /内容专题页|版本更新说明|调研|问卷|防沉迷|米游社|工具|创作者|社区|赛事|同人/;

// ─── 时间工具 ────────────────────────────────────────

function formatRemaining(ms: number): string {
  if (ms <= 0) {
    return '已结束';
  }

  const hours = Math.floor(ms / 3600000);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}天${hours % 24}小时`;
  }

  if (hours > 0) {
    return `${hours}小时`;
  }

  return `${Math.floor(ms / 60000)}分钟`;
}

function parseTime(str: string): number {
  return new Date(str.replace(/-/g, '/')).getTime();
}

// ─── 活动类型检测 ────────────────────────────────────

function detectType(title: string): 'character' | 'weapon' | 'activity' | 'abyss' | 'pass' | 'other' {
  if (/概率UP/.test(title)) {
    if (/(单手剑|双手剑|长柄武器|弓|法器|光锥)·/.test(title)) {
      return 'weapon';
    }

    if (/祈愿|跃迁|调频/.test(title)) {
      return 'character';
    }
  }

  if (/纪行|战令|月卡/.test(title)) {
    return 'pass';
  }

  if (/深境螺旋|忘却之庭|虚构叙事|幻想真境|幽境/.test(title)) {
    return 'abyss';
  }

  return 'activity';
}

// ─── 获取日历数据 ────────────────────────────────────

const GAME_NAMES: Record<string, string> = {
  gs: '原神',
  sr: '星穹铁道',
  zzz: '绝区零'
};

const CACHE_KEY_PREFIX = 'data:alemonjs-mhy:calendar';
const CACHE_TTL = 600; // 10 分钟

export async function fetchCalendar(game: string): Promise<CalendarData | null> {
  const redis = getIoRedis();
  const cacheKey = `${CACHE_KEY_PREFIX}:${game}`;

  // 检查缓存
  if (redis) {
    const cached = await redis.get(cacheKey);

    if (cached) {
      return JSON.parse(cached) as CalendarData;
    }
  }

  const config = ANN_API[game];

  if (!config) {
    return null;
  }

  // 获取公告列表
  const listRes = await fetch(config.listUrl);

  if (!listRes.ok) {
    return null;
  }

  const listJson = (await listRes.json()) as {
    retcode: number;
    data?: {
      list?: Array<{
        list: Array<{
          ann_id: number;
          title: string;
          start_time: string;
          end_time: string;
          tag_icon: string;
          banner: string;
        }>;
      }>;
    };
  };

  if (listJson.retcode !== 0 || !listJson.data?.list) {
    return null;
  }

  const now = Date.now();
  const activities: CalendarActivity[] = [];

  // 遍历所有分类
  for (const category of listJson.data.list) {
    for (const ann of category.list) {
      if (IGNORE_TITLE_REG.test(ann.title)) {
        continue;
      }

      const startMs = parseTime(ann.start_time);
      const endMs = parseTime(ann.end_time);

      // 跳过已结束超过 1 天的
      if (endMs < now - 86400000) {
        continue;
      }

      // 跳过超过 30 天后才开始的
      if (startMs > now + 30 * 86400000) {
        continue;
      }

      const isActive = startMs <= now && endMs > now;
      const remainMs = isActive ? endMs - now : startMs - now;

      activities.push({
        id: ann.ann_id,
        title: ann.title.replace(/<[^>]+>/g, ''),
        type: detectType(ann.title),
        banner: ann.banner,
        icon: ann.tag_icon,
        startTime: ann.start_time,
        endTime: ann.end_time,
        isActive,
        remaining: isActive ? `剩余 ${formatRemaining(remainMs)}` : `${formatRemaining(remainMs)}后开始`
      });
    }
  }

  // 排序: 角色卡池 > 武器卡池 > 深渊 > 纪行 > 活动，活跃优先
  const typeOrder: Record<string, number> = {
    character: 0,
    weapon: 1,
    abyss: 2,
    pass: 3,
    activity: 4,
    other: 5
  };

  activities.sort((a, b) => {
    // 活跃优先
    if (a.isActive !== b.isActive) {
      return a.isActive ? -1 : 1;
    }

    // 按类型排序
    const ta = typeOrder[a.type] ?? 5;
    const tb = typeOrder[b.type] ?? 5;

    if (ta !== tb) {
      return ta - tb;
    }

    // 同类型按结束时间排序
    return parseTime(a.endTime) - parseTime(b.endTime);
  });

  const result: CalendarData = {
    game,
    gameName: GAME_NAMES[game] ?? game,
    activities,
    now: dayjs().format('YYYY/M/D HH:mm:ss')
  };

  // 写入缓存
  if (redis) {
    await redis.set(cacheKey, JSON.stringify(result), 'EX', CACHE_TTL);
  }

  return result;
}
