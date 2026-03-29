/**
 * 圣遗物评分系统 — ArtisMark
 *
 * 评分公式: 每条副词条 = 权重 × 副词条数值 × 系数
 * 总分归一化到 66 分满分制，再映射为等级
 */
import type { ArtifactData, ArtifactSubstat, ProfileAvatar } from './enka';

// ─── 等级定义 ────────────────────────────────────────

export type ArtisGrade = 'D' | 'C' | 'B' | 'A' | 'S' | 'SS' | 'SSS' | 'ACE' | 'MAX';

export interface ArtisGradeInfo {
  grade: ArtisGrade;
  color: string;
}

const GRADE_THRESHOLDS: [number, ArtisGrade, string][] = [
  [49, 'MAX', '#e8425e'],
  [42, 'ACE', '#f0a030'],
  [35, 'SSS', '#ef5350'],
  [28, 'SS', '#ab47bc'],
  [21, 'S', '#42a5f5'],
  [14, 'A', '#66bb6a'],
  [7, 'B', '#8bc34a'],
  [3.5, 'C', '#fdd835'],
  [0, 'D', '#9e9e9e']
];

export function getGrade(mark: number): ArtisGradeInfo {
  for (const [threshold, grade, color] of GRADE_THRESHOLDS) {
    if (mark >= threshold) {
      return { grade, color };
    }
  }

  return { grade: 'D', color: '#9e9e9e' };
}

// ─── 副词条权重（每次强化的标准值） ───────────────────

/** 每条副词条单次强化的期望值 */
const SUB_STAT_UNIT: Record<string, number> = {
  暴击率: 3.9,
  暴击伤害: 7.8,
  攻击力: 5.8, // 百分比
  生命值: 5.8, // 百分比
  防御力: 7.3, // 百分比
  元素精通: 23.1,
  元素充能效率: 6.5,
  atk: 19.5, // 小攻击（固定值）
  hp: 299, // 小生命（固定值）
  def: 23.1 // 小防御（固定值）
};

// ─── 角色权重预设 ────────────────────────────────────

export interface CharWeights {
  暴击率: number;
  暴击伤害: number;
  攻击力: number;
  生命值: number;
  防御力: number;
  元素精通: number;
  元素充能效率: number;
}

/** 默认 DPS 权重 */
const DPS_WEIGHTS: CharWeights = {
  暴击率: 100,
  暴击伤害: 100,
  攻击力: 75,
  生命值: 0,
  防御力: 0,
  元素精通: 0,
  元素充能效率: 30
};

/** 生命系 DPS (如胡桃、夜兰) */
const HP_DPS_WEIGHTS: CharWeights = {
  暴击率: 100,
  暴击伤害: 100,
  攻击力: 0,
  生命值: 80,
  防御力: 0,
  元素精通: 25,
  元素充能效率: 30
};

/** 防御系 DPS (如荒�的) */
const DEF_DPS_WEIGHTS: CharWeights = {
  暴击率: 100,
  暴击伤害: 100,
  攻击力: 0,
  生命值: 0,
  防御力: 80,
  元素精通: 0,
  元素充能效率: 30
};

/** 精通系 DPS (如提纳里) */
const EM_DPS_WEIGHTS: CharWeights = {
  暴击率: 100,
  暴击伤害: 100,
  攻击力: 50,
  生命值: 0,
  防御力: 0,
  元素精通: 75,
  元素充能效率: 30
};

/** 辅助权重 */
const SUPPORT_WEIGHTS: CharWeights = {
  暴击率: 50,
  暴击伤害: 50,
  攻击力: 50,
  生命值: 80,
  防御力: 0,
  元素精通: 0,
  元素充能效率: 75
};

/** 治疗权重 */
const HEAL_WEIGHTS: CharWeights = {
  暴击率: 0,
  暴击伤害: 0,
  攻击力: 50,
  生命值: 100,
  防御力: 0,
  元素精通: 0,
  元素充能效率: 55
};

/** 角色名 → 权重集的映射（仅列出非标准 DPS 的角色） */
const CHAR_WEIGHT_MAP: Record<string, CharWeights> = {
  // 生命系
  胡桃: HP_DPS_WEIGHTS,
  夜兰: HP_DPS_WEIGHTS,
  珊瑚宫心海: HEAL_WEIGHTS,
  芙宁娜: HP_DPS_WEIGHTS,
  // 防御系
  荒泷一斗: DEF_DPS_WEIGHTS,
  诺艾尔: DEF_DPS_WEIGHTS,
  阿贝多: DEF_DPS_WEIGHTS,
  五郎: { ...SUPPORT_WEIGHTS, 防御力: 80 },
  // 精通系
  提纳里: EM_DPS_WEIGHTS,
  纳西妲: EM_DPS_WEIGHTS,
  // 辅助
  钟离: SUPPORT_WEIGHTS,
  班尼特: SUPPORT_WEIGHTS,
  万叶: { ...SUPPORT_WEIGHTS, 元素精通: 100, 暴击率: 0, 暴击伤害: 0 },
  温迪: { ...SUPPORT_WEIGHTS, 元素精通: 80 },
  // 治疗
  七七: HEAL_WEIGHTS,
  芭芭拉: HEAL_WEIGHTS,
  早柚: HEAL_WEIGHTS
};

function getCharWeights(name: string): CharWeights {
  return CHAR_WEIGHT_MAP[name] ?? DPS_WEIGHTS;
}

// ─── 副词条名称归一化 ────────────────────────────────

function normalizeSubKey(name: string): string | null {
  if (name.includes('暴击率')) {
    return '暴击率';
  }

  if (name.includes('暴击伤害')) {
    return '暴击伤害';
  }

  if (name.includes('元素精通')) {
    return '元素精通';
  }

  if (name.includes('元素充能') || name.includes('充能效率')) {
    return '元素充能效率';
  }

  // 区分百分比和固定值
  if (name.includes('攻击')) {
    return '攻击力';
  }

  if (name.includes('生命')) {
    return '生命值';
  }

  if (name.includes('防御')) {
    return '防御力';
  }

  return null;
}

/** 判断副词条是否为百分比 */
function isPercentSub(sub: ArtifactSubstat): boolean {
  return sub.value.includes('%');
}

/** 将副词条值解析为数字 */
function parseSubValue(sub: ArtifactSubstat): number {
  return parseFloat(sub.value.replace('%', '')) || 0;
}

// ─── 单圣遗物评分 ───────────────────────────────────

export interface ArtifactScore {
  mark: number; // 评分 (0-66)
  grade: ArtisGradeInfo;
  subScores: { name: string; score: number }[];
}

/**
 * 计算单个圣遗物评分
 * @param art 圣遗物数据
 * @param charName 角色名（用于获取权重）
 */
export function scoreArtifact(art: ArtifactData, charName: string): ArtifactScore {
  const weights = getCharWeights(charName);
  const subScores: { name: string; score: number }[] = [];
  let totalMark = 0;

  for (const sub of art.subStats) {
    const key = normalizeSubKey(sub.name);

    if (!key) {
      subScores.push({ name: sub.name, score: 0 });

      continue;
    }

    const weight = weights[key as keyof CharWeights] ?? 0;

    if (weight === 0) {
      subScores.push({ name: sub.name, score: 0 });

      continue;
    }

    const value = parseSubValue(sub);
    const isPct = isPercentSub(sub);

    // 对固定值（小攻击/小生命/小防御），使用较低的权重
    let unitKey = key;

    if (!isPct && (key === '攻击力' || key === '生命值' || key === '防御力')) {
      unitKey = key === '攻击力' ? 'atk' : key === '生命值' ? 'hp' : 'def';
    }

    const unit = SUB_STAT_UNIT[unitKey] ?? 1;
    const rolls = value / unit; // 相当于强化了几次
    const score = (rolls * weight) / 100;

    subScores.push({ name: sub.name, score: Math.round(score * 10) / 10 });
    totalMark += score;
  }

  // 归一化：5条副词条 × 满roll(~1.0) × 满权重(100/100) ≈ 5，但实际最高 ~66
  const normalizedMark = Math.round(totalMark * 10) / 10;

  return {
    mark: normalizedMark,
    grade: getGrade(normalizedMark),
    subScores
  };
}

// ─── 角色总评 ───────────────────────────────────────

export interface CharacterArtisScore {
  totalMark: number;
  avgMark: number;
  grade: ArtisGradeInfo;
  artifacts: (ArtifactScore & { pos: number; name: string })[];
}

/**
 * 计算角色全部圣遗物的综合评分
 */
export function scoreCharacterArtifacts(avatar: ProfileAvatar): CharacterArtisScore {
  const arts = avatar.artifacts ?? [];
  const artifacts: (ArtifactScore & { pos: number; name: string })[] = [];
  let totalMark = 0;

  for (const art of arts) {
    const score = scoreArtifact(art, avatar.name);

    artifacts.push({
      ...score,
      pos: art.pos,
      name: art.name
    });
    totalMark += score.mark;
  }

  const count = artifacts.length || 1;
  const avgMark = totalMark / count;

  return {
    totalMark: Math.round(totalMark * 10) / 10,
    avgMark: Math.round(avgMark * 10) / 10,
    grade: getGrade(avgMark),
    artifacts
  };
}
