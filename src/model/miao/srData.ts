/**
 * 星穹铁道角色数据加载 — 通过 import 引入资源，构建系统自动处理路径
 */
import { SR_CHARACTER_DATA } from '@src/assets/sr/character/index.js';
import { ITEM_ICONS } from '@src/assets/sr/icon_item/index.js';
import { SKILL_ICONS } from '@src/assets/sr/icon_skill/index.js';
import { ELEMENT_ICONS, PATH_ICONS, STAR_ICON } from '@src/assets/sr/img/index.js';
import ITEMS_DATA from '@src/assets/sr/items/index.js';

// ─── 数据类型 ────────────────────────────────────────

export interface SrBaseAttr {
  name: string;
  key: string;
  num: number | string;
}

export interface SrSkillData {
  id: string;
  name: string;
  type_text: string;
  simple_desc: string;
  max_level: number;
  icon: string;
}

export interface SrEidolon {
  id: string;
  name: string;
  effect: string;
  icon: string;
}

export interface SrMaterial {
  id: string;
  name: string;
  num: number;
  rarity: number;
  icon: string;
}

export interface SrCharacterData {
  id: string;
  name: string;
  rarity: number;
  element: string;
  path: string;
  desc: string;
  sp: number;
  cncv: string;
  jpcv: string;
  portrait: string;
  baseAttr: SrBaseAttr[];
  skills: SrSkillData[];
  eidolons: SrEidolon[];
  materials: SrMaterial[];
}

// ─── 属性名映射 ─────────────────────────────────────

const BASE_ATTR_NAMES: Record<string, string> = {
  atk: '攻击力',
  hp: '生命值',
  def: '防御力',
  speed: '速度',
  cpct: '暴击率',
  cdmg: '暴击伤害',
  aggro: '嘲讽'
};

/** 解析 JSON 中的图标路径为构建后的 URL */
function resolveIcon(iconPath: string): string {
  if (!iconPath) { return ''; }

  return SKILL_ICONS[iconPath] ?? ITEM_ICONS[iconPath] ?? '';
}

// ─── 主加载函数 ──────────────────────────────────────

export function loadSrCharacter(name: string): SrCharacterData | null {
  const raw = SR_CHARACTER_DATA[name];

  if (!raw) { return null; }

  // 基础属性
  const baseAttr: SrBaseAttr[] = [{ key: 'sp', name: '能量', num: raw.sp ?? 0 }];

  if (raw.baseAttr) {
    for (const [key, val] of Object.entries(raw.baseAttr)) {
      baseAttr.push({
        key,
        name: BASE_ATTR_NAMES[key] ?? key,
        num: Math.floor(Number(val))
      });
    }
  }

  // 技能
  const skills: SrSkillData[] = [];

  if (raw.skillsData && typeof raw.skillsData === 'object') {
    for (const [, val] of Object.entries(raw.skillsData)) {
      const sd = val as Record<string, any>;

      skills.push({
        id: sd.id,
        name: sd.name,
        type_text: sd.type_text ?? '',
        simple_desc: sd.simple_desc ?? '',
        max_level: sd.max_level ?? 1,
        icon: resolveIcon(sd.icon ?? '')
      });
    }
  }

  // 星魂
  const eidolons: SrEidolon[] = [];

  if (Array.isArray(raw.eidolons)) {
    for (const e of raw.eidolons) {
      eidolons.push({
        id: e.id,
        name: e.name,
        effect: e.effect ?? '',
        icon: resolveIcon(e.icon ?? '')
      });
    }
  }

  // 材料（合并所有升级阶段）
  const materialMap = new Map<string, { num: number }>();

  if (Array.isArray(raw.materials)) {
    for (const group of raw.materials) {
      if (!Array.isArray(group)) { continue; }
      for (const m of group) {
        const existing = materialMap.get(String(m.id));

        if (existing) {
          existing.num += m.num;
        } else {
          materialMap.set(String(m.id), { num: m.num });
        }
      }
    }
  }

  const materials: SrMaterial[] = [];

  for (const [id, { num }] of materialMap) {
    const item = (ITEMS_DATA as Record<string, any>)[id];

    if (!item) { continue; }
    materials.push({
      id,
      name: item.name,
      num,
      rarity: item.rarity ?? 3,
      icon: resolveIcon(item.icon ?? '')
    });
  }
  // 按稀有度降序
  materials.sort((a, b) => b.rarity - a.rarity);

  return {
    id: raw.id ?? '',
    name: raw.name ?? name,
    rarity: raw.rarity ?? 4,
    element: raw.element ?? '',
    path: raw.path ?? '',
    desc: raw.desc ?? '',
    sp: raw.sp ?? 0,
    cncv: raw.cncv ?? '',
    jpcv: raw.jpcv ?? '',
    portrait: '',
    baseAttr,
    skills,
    eidolons,
    materials
  };
}

/** 获取属性图标 URL */
export function srElementIcon(element: string): string {
  return ELEMENT_ICONS[element] ?? '';
}

/** 获取命途图标 URL */
export function srPathIcon(pathName: string): string {
  return PATH_ICONS[pathName] ?? '';
}

/** 获取星星图标 URL */
export function srStarIcon(): string {
  return STAR_ICON;
}
