/**
 * 日历模块 — 解析米游社公告获取活动/素材日程 (甘特图时间轴版)
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
  /** 甘特图左偏移 % */
  left: number;
  /** 甘特图宽度 % */
  width: number;
  /** 时间标签 (MM-DD HH:mm 格式) */
  label: string;
  /** 排序权重 */
  sort: number;
}

/** 日期列 */
export interface DateEntry {
  month: number;
  dates: Array<{ day: number; weekday: string }>;
}

export interface CalendarData {
  game: string;
  gameName: string;
  /** 甘特图主活动行 (二维数组, 同行最多2个不重叠的活动) */
  rows: CalendarActivity[][];
  /** 深渊/挑战独立行 */
  abyssRows: CalendarActivity[];
  /** 13天日期表头 */
  dateList: DateEntry[];
  /** 当前日 (日期数字) */
  nowDate: number;
  /** 当前时间竖线位置 % */
  nowLeft: number;
  /** 当前时间 */
  nowTime: string;
  now: string;
}

// ─── 忽略的公告 ──────────────────────────────────────

const IGNORE_TITLE_REG = /内容专题页|版本更新说明|调研|问卷|防沉迷|米游社|工具|创作者|社区|赛事|同人/;

const WEEK_NAMES = ['日', '一', '二', '三', '四', '五', '六'];

// ─── 时间工具 ────────────────────────────────────────

function formatRemaining(ms: number): string {
  if (ms <= 0) { return '已结束'; }

  const hours = Math.floor(ms / 3600000);
  const days = Math.floor(hours / 24);

  if (days > 0) { return `${days}天${hours % 24}小时`; }
  if (hours > 0) { return `${hours}小时`; }

  return `${Math.floor(ms / 60000)}分钟`;
}

function parseTime(str: string): number {
  return new Date(str.replace(/-/g, '/')).getTime();
}

// ─── 活动类型检测 ────────────────────────────────────

function detectType(title: string): CalendarActivity['type'] {
  if (/概率UP/.test(title)) {
    if (/(单手剑|双手剑|长柄武器|弓|法器|光锥)·/.test(title)) { return 'weapon'; }
    if (/祈愿|跃迁|调频/.test(title)) { return 'character'; }
  }

  if (/纪行|战令|月卡/.test(title)) { return 'pass'; }
  if (/深境螺旋|忘却之庭|虚构叙事|幻想真境|幽境/.test(title)) { return 'abyss'; }

  return 'activity';
}

// ─── 13天日期范围 ────────────────────────────────────

interface DateRange {
  dateList: DateEntry[];
  startMs: number;
  endMs: number;
  totalRange: number;
  nowLeft: number;
  nowDate: number;
}

function buildDateRange(): DateRange {
  const today = dayjs();
  const dateList: DateEntry[] = [];
  let curMonth = 0;
  let curEntry: DateEntry | null = null;

  // 7天前 ~ 5天后 = 13天
  const startDay = today.add(-7, 'day');
  const endDay = today.add(5, 'day');

  for (let i = 0; i < 13; i++) {
    const d = startDay.add(i + 1, 'day');
    const m = d.month() + 1;
    const day = d.date();
    const weekday = WEEK_NAMES[d.day()];

    if (m !== curMonth) {
      curEntry = { month: m, dates: [] };
      dateList.push(curEntry);
      curMonth = m;
    }

    curEntry!.dates.push({ day, weekday });
  }

  const startMs = startDay.add(1, 'day').startOf('day').valueOf();
  const endMs = endDay.endOf('day').valueOf();
  const totalRange = endMs - startMs;
  const nowLeft = ((Date.now() - startMs) / totalRange) * 100;

  return {
    dateList,
    startMs,
    endMs,
    totalRange,
    nowLeft: Math.max(0, Math.min(100, nowLeft)),
    nowDate: today.date()
  };
}

// ─── 深渊周期计算 (原神) ────────────────────────────

function buildAbyssEntries(game: string, range: DateRange): CalendarActivity[] {
  if (game !== 'gs') { return []; }

  const now = dayjs();
  const entries: CalendarActivity[] = [];

  // 幻想真境剧诗: 每月1号 04:00 ~ 次月1号 03:59
  // 深境螺旋: 每月16号 04:00 ~ 次月16号 03:59
  const checks: Array<{ title: string; start: dayjs.Dayjs; end: dayjs.Dayjs }> = [];
  const lastM = now.subtract(1, 'month');
  const currM = now;
  const nextM = now.add(1, 'month');

  checks.push({
    title: `「幻想真境剧诗」· ${lastM.month() + 1}月`,
    start: lastM.startOf('month').hour(4),
    end: currM.startOf('month').hour(3).minute(59)
  });
  checks.push({
    title: `「幻想真境剧诗」· ${currM.month() + 1}月`,
    start: currM.startOf('month').hour(4),
    end: nextM.startOf('month').hour(3).minute(59)
  });
  checks.push({
    title: `「深境螺旋」· ${lastM.month() + 1}月`,
    start: lastM.date(16).hour(4).minute(0).second(0),
    end: currM.date(16).hour(3).minute(59).second(59)
  });
  checks.push({
    title: `「深境螺旋」· ${currM.month() + 1}月`,
    start: currM.date(16).hour(4).minute(0).second(0),
    end: nextM.date(16).hour(3).minute(59).second(59)
  });

  for (const c of checks) {
    const sMs = c.start.valueOf();
    const eMs = c.end.valueOf();

    if (sMs > range.endMs || eMs < range.startMs) { continue; }

    const clampS = Math.max(sMs, range.startMs);
    const clampE = Math.min(eMs, range.endMs);
    const left = ((clampS - range.startMs) / range.totalRange) * 100;
    const width = ((clampE - range.startMs) / range.totalRange) * 100 - left;

    const isActive = sMs <= Date.now() && eMs > Date.now();
    const remainMs = isActive ? eMs - Date.now() : sMs - Date.now();

    entries.push({
      id: 0,
      title: c.title,
      type: 'abyss',
      banner: '',
      icon: '',
      startTime: c.start.format('YYYY-MM-DD HH:mm'),
      endTime: c.end.format('YYYY-MM-DD HH:mm'),
      isActive,
      remaining: isActive ? `剩余 ${formatRemaining(remainMs)}` : `${formatRemaining(remainMs)}后开始`,
      left,
      width: Math.max(width, 1),
      label: isActive
        ? `${c.end.format('MM-DD HH:mm')} (${formatRemaining(remainMs)}后结束)`
        : `${c.start.format('MM-DD HH:mm')} (${formatRemaining(remainMs)}后开始)`,
      sort: 0
    });
  }

  return entries;
}

// ─── 获取日历数据 ────────────────────────────────────

const GAME_NAMES: Record<string, string> = {
  gs: '原神',
  sr: '星穹铁道',
  zzz: '绝区零'
};

const CACHE_KEY_PREFIX = 'data:alemonjs-mhy:calendar';
const CACHE_TTL = 600;

const TYPE_SORT: Record<string, number> = {
  character: 1,
  weapon: 3,
  pass: 4,
  activity: 5,
  other: 10
};

export async function fetchCalendar(game: string): Promise<CalendarData | null> {
  const redis = getIoRedis();
  const cacheKey = `${CACHE_KEY_PREFIX}:${game}`;

  if (redis) {
    const cached = await redis.get(cacheKey);

    if (cached) { return JSON.parse(cached) as CalendarData; }
  }

  const config = ANN_API[game];

  if (!config) { return null; }

  const listRes = await fetch(config.listUrl);

  if (!listRes.ok) { return null; }

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

  if (listJson.retcode !== 0 || !listJson.data?.list) { return null; }

  const now = Date.now();
  const range = buildDateRange();
  const activities: CalendarActivity[] = [];

  for (const category of listJson.data.list) {
    for (const ann of category.list) {
      if (IGNORE_TITLE_REG.test(ann.title)) { continue; }

      const startMs = parseTime(ann.start_time);
      const endMs = parseTime(ann.end_time);

      if (endMs < now - 86400000) { continue; }
      if (startMs > now + 30 * 86400000) { continue; }

      // 跳过深渊类 (由 buildAbyssEntries 生成)
      const type = detectType(ann.title);

      if (type === 'abyss') { continue; }

      const isActive = startMs <= now && endMs > now;
      const remainMs = isActive ? endMs - now : startMs - now;

      // 计算甘特图位置
      const clampS = Math.max(startMs, range.startMs);
      const clampE = Math.min(endMs, range.endMs);
      const left = ((clampS - range.startMs) / range.totalRange) * 100;
      const width = ((clampE - range.startMs) / range.totalRange) * 100 - left;

      if (width <= 0 && left > 100) { continue; }

      const sLabel = dayjs(startMs).format('MM-DD HH:mm');
      const eLabel = dayjs(endMs).format('MM-DD HH:mm');
      let label: string;

      if (endMs - startMs > 365 * 86400000) {
        label = isActive ? `${sLabel} 后永久有效` : '永久有效';
      } else if (isActive) {
        label = `${eLabel} (${formatRemaining(remainMs)}后结束)`;
        if (width > 38) { label = `${sLabel} ~ ${label}`; }
      } else if (startMs > now) {
        label = `${sLabel} (${formatRemaining(remainMs)}后开始)`;
      } else {
        label = `${sLabel} ~ ${eLabel}`;
      }

      const title = ann.title.replace(/<[^>]+>/g, '');

      activities.push({
        id: ann.ann_id,
        title,
        type,
        banner: ann.banner,
        icon: ann.tag_icon,
        startTime: ann.start_time,
        endTime: ann.end_time,
        isActive,
        remaining: isActive ? `剩余 ${formatRemaining(remainMs)}` : `${formatRemaining(remainMs)}后开始`,
        left: Math.max(left, 0),
        width: Math.max(width, 1),
        label,
        sort: TYPE_SORT[type] ?? 10
      });
    }
  }

  // 排序: character > weapon > pass > activity
  activities.sort((a, b) => {
    if (a.sort !== b.sort) { return a.sort - b.sort; }

    return parseTime(a.startTime) - parseTime(b.startTime);
  });

  // 按行合并 — 同行最多 2 个不重叠的 activity/other
  const merged = new Set<number>();
  const rows: CalendarActivity[][] = [];

  for (let i = 0; i < activities.length; i++) {
    if (merged.has(i)) { continue; }

    const li = activities[i];

    merged.add(i);

    if (li.type === 'activity' || li.type === 'other') {
      // 寻找可合并的第二个
      for (let j = i + 1; j < activities.length; j++) {
        if (merged.has(j)) { continue; }

        const li2 = activities[j];

        if ((li2.type === 'activity' || li2.type === 'other') && li.left + li.width <= li2.left) {
          merged.add(j);
          rows.push([li, li2]);
          break;
        }
      }

      if (!merged.has(i) || rows[rows.length - 1]?.[0] !== li) {
        rows.push([li]);
      }
    } else {
      rows.push([li]);
    }
  }

  // 深渊
  const abyssRows = buildAbyssEntries(game, range);

  const nowTime = dayjs().format('YYYY-MM-DD HH:mm');

  const result: CalendarData = {
    game,
    gameName: GAME_NAMES[game] ?? game,
    rows,
    abyssRows,
    dateList: range.dateList,
    nowDate: range.nowDate,
    nowLeft: range.nowLeft,
    nowTime,
    now: dayjs().format('YYYY/M/D HH:mm:ss')
  };

  if (redis) {
    await redis.set(cacheKey, JSON.stringify(result), 'EX', CACHE_TTL);
  }

  return result;
}
