/**
 * 原神角色卡池 UP 历史数据
 * 数据截至 5.x 版本，仅包含五星限定角色
 */
import dayjs from 'dayjs';

interface PoolEntry {
  version: string;
  phase: number; // 1=上半 2=下半
  /** YYYY-MM-DD 开始日期(近似) */
  start: string;
  chars: string[];
}

/** 五星角色卡池历史（从 1.0 至今，按时间正序） */
const POOL_HISTORY: PoolEntry[] = [
  // 1.x
  { version: '1.0', phase: 1, start: '2020-09-28', chars: ['温迪'] },
  { version: '1.0', phase: 2, start: '2020-10-20', chars: ['可莉'] },
  { version: '1.1', phase: 1, start: '2020-11-11', chars: ['达达利亚'] },
  { version: '1.1', phase: 2, start: '2020-12-01', chars: ['钟离'] },
  { version: '1.2', phase: 1, start: '2020-12-23', chars: ['阿贝多'] },
  { version: '1.2', phase: 2, start: '2021-01-12', chars: ['甘雨'] },
  { version: '1.3', phase: 1, start: '2021-02-03', chars: ['魈'] },
  { version: '1.3', phase: 2, start: '2021-02-17', chars: ['刻晴'] },
  { version: '1.3', phase: 3, start: '2021-03-02', chars: ['胡桃'] },
  { version: '1.4', phase: 1, start: '2021-03-17', chars: ['温迪'] },
  { version: '1.4', phase: 2, start: '2021-04-06', chars: ['达达利亚'] },
  { version: '1.5', phase: 1, start: '2021-04-28', chars: ['钟离'] },
  { version: '1.5', phase: 2, start: '2021-05-18', chars: ['优菈'] },
  { version: '1.6', phase: 1, start: '2021-06-09', chars: ['可莉'] },
  { version: '1.6', phase: 2, start: '2021-06-29', chars: ['枫原万叶'] },
  // 2.x
  { version: '2.0', phase: 1, start: '2021-07-21', chars: ['神里绫华'] },
  { version: '2.0', phase: 2, start: '2021-08-10', chars: ['宵宫'] },
  { version: '2.1', phase: 1, start: '2021-09-01', chars: ['雷电将军'] },
  { version: '2.1', phase: 2, start: '2021-09-21', chars: ['珊瑚宫心海'] },
  { version: '2.2', phase: 1, start: '2021-10-13', chars: ['达达利亚'] },
  { version: '2.2', phase: 2, start: '2021-11-02', chars: ['胡桃'] },
  { version: '2.3', phase: 1, start: '2021-11-24', chars: ['阿贝多', '优菈'] },
  { version: '2.3', phase: 2, start: '2021-12-14', chars: ['荒泷一斗'] },
  { version: '2.4', phase: 1, start: '2022-01-05', chars: ['申鹤', '魈'] },
  { version: '2.4', phase: 2, start: '2022-01-25', chars: ['甘雨', '钟离'] },
  { version: '2.5', phase: 1, start: '2022-02-16', chars: ['八重神子'] },
  { version: '2.5', phase: 2, start: '2022-03-08', chars: ['雷电将军', '珊瑚宫心海'] },
  { version: '2.6', phase: 1, start: '2022-03-30', chars: ['神里绫人', '温迪'] },
  { version: '2.6', phase: 2, start: '2022-04-19', chars: ['神里绫华'] },
  { version: '2.7', phase: 1, start: '2022-05-31', chars: ['夜兰', '魈'] },
  { version: '2.7', phase: 2, start: '2022-06-21', chars: ['荒泷一斗'] },
  { version: '2.8', phase: 1, start: '2022-07-13', chars: ['可莉', '枫原万叶'] },
  { version: '2.8', phase: 2, start: '2022-08-02', chars: ['宵宫'] },
  // 3.x
  { version: '3.0', phase: 1, start: '2022-08-24', chars: ['提纳里', '钟离'] },
  { version: '3.0', phase: 2, start: '2022-09-09', chars: ['甘雨', '珊瑚宫心海'] },
  { version: '3.1', phase: 1, start: '2022-09-28', chars: ['赛诺', '温迪'] },
  { version: '3.1', phase: 2, start: '2022-10-14', chars: ['妮露', '阿贝多'] },
  { version: '3.2', phase: 1, start: '2022-11-02', chars: ['纳西妲', '八重神子'] },
  { version: '3.2', phase: 2, start: '2022-11-18', chars: ['优菈', '荒泷一斗'] },
  { version: '3.3', phase: 1, start: '2022-12-07', chars: ['流浪者', '神里绫人'] },
  { version: '3.3', phase: 2, start: '2022-12-27', chars: ['雷电将军'] },
  { version: '3.4', phase: 1, start: '2023-01-18', chars: ['艾尔海森', '魈'] },
  { version: '3.4', phase: 2, start: '2023-02-07', chars: ['胡桃', '夜兰'] },
  { version: '3.5', phase: 1, start: '2023-03-01', chars: ['迪希雅', '赛诺'] },
  { version: '3.5', phase: 2, start: '2023-03-21', chars: ['神里绫华', '申鹤'] },
  { version: '3.6', phase: 1, start: '2023-04-12', chars: ['纳西妲', '妮露'] },
  { version: '3.6', phase: 2, start: '2023-05-02', chars: ['白术', '甘雨'] },
  { version: '3.7', phase: 1, start: '2023-05-24', chars: ['八重神子', '宵宫'] },
  { version: '3.7', phase: 2, start: '2023-06-13', chars: ['枫原万叶', '达达利亚'] },
  { version: '3.8', phase: 1, start: '2023-07-05', chars: ['优菈', '可莉'] },
  { version: '3.8', phase: 2, start: '2023-07-25', chars: ['珊瑚宫心海', '流浪者'] },
  // 4.x
  { version: '4.0', phase: 1, start: '2023-08-16', chars: ['林尼', '夜兰'] },
  { version: '4.0', phase: 2, start: '2023-09-05', chars: ['钟离', '达达利亚'] },
  { version: '4.1', phase: 1, start: '2023-09-27', chars: ['那维莱特', '胡桃'] },
  { version: '4.1', phase: 2, start: '2023-10-17', chars: ['莱欧斯利', '温迪'] },
  { version: '4.2', phase: 1, start: '2023-11-08', chars: ['芙宁娜', '白术'] },
  { version: '4.2', phase: 2, start: '2023-11-28', chars: ['赛诺', '神里绫人'] },
  { version: '4.3', phase: 1, start: '2023-12-20', chars: ['娜维娅', '雷电将军'] },
  { version: '4.3', phase: 2, start: '2024-01-09', chars: ['纳西妲', '神里绫华'] },
  { version: '4.4', phase: 1, start: '2024-01-31', chars: ['魈', '八重神子'] },
  { version: '4.4', phase: 2, start: '2024-02-20', chars: ['甘雨', '林尼'] },
  { version: '4.5', phase: 1, start: '2024-03-13', chars: ['千织', '艾尔海森'] },
  { version: '4.5', phase: 2, start: '2024-04-02', chars: ['那维莱特', '枫原万叶'] },
  { version: '4.6', phase: 1, start: '2024-04-24', chars: ['阿蕾奇诺', '林尼'] },
  { version: '4.6', phase: 2, start: '2024-05-14', chars: ['芙宁娜', '莱欧斯利'] },
  { version: '4.7', phase: 1, start: '2024-06-05', chars: ['克洛琳德', '宵宫'] },
  { version: '4.7', phase: 2, start: '2024-06-25', chars: ['希格雯', '流浪者'] },
  { version: '4.8', phase: 1, start: '2024-07-17', chars: ['娜维娅', '妮露'] },
  { version: '4.8', phase: 2, start: '2024-08-06', chars: ['优菈', '钟离'] },
  // 5.x
  { version: '5.0', phase: 1, start: '2024-08-28', chars: ['玛拉妮', '枫原万叶'] },
  { version: '5.0', phase: 2, start: '2024-09-17', chars: ['基尼奇', '雷电将军'] },
  { version: '5.1', phase: 1, start: '2024-10-09', chars: ['希诺宁', '胡桃'] },
  { version: '5.1', phase: 2, start: '2024-10-29', chars: ['卡齐娜', '那维莱特'] },
  { version: '5.2', phase: 1, start: '2024-11-20', chars: ['恰斯卡', '纳西妲'] },
  { version: '5.2', phase: 2, start: '2024-12-10', chars: ['芙宁娜', '千织'] },
  { version: '5.3', phase: 1, start: '2025-01-01', chars: ['玛薇卡', '阿蕾奇诺'] },
  { version: '5.3', phase: 2, start: '2025-01-21', chars: ['克洛琳德', '神里绫华'] },
  { version: '5.4', phase: 1, start: '2025-02-12', chars: ['水仙', '希格雯'] },
  { version: '5.4', phase: 2, start: '2025-03-04', chars: ['艾梅丽埃', '甘雨'] },
  { version: '5.5', phase: 1, start: '2025-03-26', chars: ['伊安珊', '娜维娅'] },
  { version: '5.5', phase: 2, start: '2025-04-15', chars: ['基尼奇', '白术'] },
  { version: '5.6', phase: 1, start: '2025-05-07', chars: ['伊法', '玛拉妮'] },
  { version: '5.6', phase: 2, start: '2025-05-27', chars: ['恰斯卡', '八重神子'] }
];

/** 常驻池角色（排除在统计外） */
const PERMANENT_CHARS = new Set(['琴', '迪卢克', '莫娜', '刻晴', '七七', '提纳里', '迪希雅']);

/** 获取指定角色的 UP 记录 */
export function getCharBannerRecords(name: string): { version: string; phase: number; daysSince: number }[] {
  const now = dayjs();

  return POOL_HISTORY.filter(p => p.chars.includes(name)).map(p => ({
    version: p.version,
    phase: p.phase,
    daysSince: now.diff(dayjs(p.start), 'day')
  }));
}

/** 获取全部五星限定角色的复刻统计，按最久未复刻排序 */
export function getAllBannerStats(): {
  name: string;
  upCount: number;
  lastVersion: string;
  daysSince: number;
}[] {
  const now = dayjs();
  const charMap = new Map<string, { upCount: number; lastVersion: string; lastStart: string }>();

  for (const pool of POOL_HISTORY) {
    for (const name of pool.chars) {
      if (PERMANENT_CHARS.has(name)) {
        continue;
      }

      const existing = charMap.get(name);

      if (!existing) {
        charMap.set(name, { upCount: 1, lastVersion: pool.version, lastStart: pool.start });
      } else {
        existing.upCount++;
        existing.lastVersion = pool.version;
        existing.lastStart = pool.start;
      }
    }
  }

  return [...charMap.entries()]
    .map(([name, info]) => ({
      name,
      upCount: info.upCount,
      lastVersion: info.lastVersion,
      daysSince: now.diff(dayjs(info.lastStart), 'day')
    }))
    .sort((a, b) => b.daysSince - a.daysSince);
}

/** 检查角色是否在卡池数据中 */
export function hasCharInPool(name: string): boolean {
  return POOL_HISTORY.some(p => p.chars.includes(name));
}
