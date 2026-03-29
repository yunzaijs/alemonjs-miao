/**
 * 原神角色数据加载 — 通过 import 引入资源，构建系统自动处理路径
 * 数据源：miao-plugin resources/meta-gs/character/<name>/data.json
 */
import { GS_CHARACTER_DATA } from '@src/assets/gs/character/index.js';

// ─── 数据类型 ────────────────────────────────────────

export interface GsTalent {
  key: string; // 'a' | 'e' | 'q'
  name: string;
  desc: string[];
  /** 倍率表（一般只展示名称，不展示全部倍率） */
  tableNames: string[];
}

export interface GsPassive {
  name: string;
  desc: string[];
}

export interface GsConstellation {
  index: number; // 1-6
  name: string;
  desc: string[];
}

export interface GsMaterials {
  gem: string;
  boss: string;
  specialty: string;
  normal: string;
  talent: string;
  weekly: string;
}

export interface GsBaseAttr {
  hp: number;
  atk: number;
  def: number;
}

export interface GsGrowAttr {
  key: string;
  value: number;
}

export interface GsCharacterData {
  id: number;
  name: string;
  title: string;
  star: number;
  elem: string;
  weapon: string;
  desc: string;
  astro: string;
  allegiance: string;
  cncv: string;
  jpcv: string;
  baseAttr: GsBaseAttr;
  growAttr: GsGrowAttr;
  materials: GsMaterials;
  talents: GsTalent[];
  passives: GsPassive[];
  constellations: GsConstellation[];
}

// ─── 突破属性中文映射 ───────────────────────────────

const GROW_ATTR_NAMES: Record<string, string> = {
  cpct: '暴击率',
  cdmg: '暴击伤害',
  mastery: '元素精通',
  recharge: '元素充能效率',
  heal: '治疗加成',
  hpPct: '生命值',
  atkPct: '攻击力',
  defPct: '防御力',
  dmg: '元素伤害加成',
  phy: '物理伤害加成'
};

// ─── 天赋类型标签 ───────────────────────────────────

const TALENT_LABELS: Record<string, string> = {
  a: '普通攻击',
  e: '元素战技',
  q: '元素爆发'
};

// ─── 主加载函数 ──────────────────────────────────────

export function loadGsCharacter(name: string): GsCharacterData | null {
  const raw = GS_CHARACTER_DATA[name];

  if (!raw) {
    return null;
  }

  // 解析天赋
  const talents: GsTalent[] = [];

  if (raw.talent) {
    for (const key of ['a', 'e', 'q']) {
      const t = raw.talent[key];

      if (!t) {
        continue;
      }
      talents.push({
        key,
        name: t.name ?? TALENT_LABELS[key] ?? key,
        desc: Array.isArray(t.desc) ? t.desc : [],
        tableNames: Array.isArray(t.tables) ? t.tables.map((tb: any) => tb.name) : []
      });
    }
  }

  // 解析固有天赋
  const passives: GsPassive[] = [];

  if (Array.isArray(raw.passive)) {
    for (const p of raw.passive) {
      passives.push({
        name: p.name ?? '',
        desc: Array.isArray(p.desc) ? p.desc : []
      });
    }
  }

  // 解析命座
  const constellations: GsConstellation[] = [];

  if (raw.cons) {
    for (let i = 1; i <= 6; i++) {
      const c = raw.cons[String(i)];

      if (!c) {
        continue;
      }
      constellations.push({
        index: i,
        name: c.name ?? `命座${i}`,
        desc: Array.isArray(c.desc) ? c.desc : []
      });
    }
  }

  return {
    id: raw.id ?? 0,
    name: raw.name ?? name,
    title: raw.title ?? '',
    star: raw.star ?? 4,
    elem: raw.elem ?? '',
    weapon: raw.weapon ?? '',
    desc: raw.desc ?? '',
    astro: raw.astro ?? '',
    allegiance: raw.allegiance ?? '',
    cncv: raw.cncv ?? '',
    jpcv: raw.jpcv ?? '',
    baseAttr: {
      hp: raw.baseAttr?.hp ?? 0,
      atk: raw.baseAttr?.atk ?? 0,
      def: raw.baseAttr?.def ?? 0
    },
    growAttr: {
      key: raw.growAttr?.key ?? '',
      value: raw.growAttr?.value ?? 0
    },
    materials: {
      gem: raw.materials?.gem ?? '',
      boss: raw.materials?.boss ?? '',
      specialty: raw.materials?.specialty ?? '',
      normal: raw.materials?.normal ?? '',
      talent: raw.materials?.talent ?? '',
      weekly: raw.materials?.weekly ?? ''
    },
    talents,
    passives,
    constellations
  };
}

/** 获取突破属性的中文名 */
export function growAttrName(key: string): string {
  return GROW_ATTR_NAMES[key] ?? key;
}
