/**
 * 原神角色 ID → 元数据映射
 * 数据来源: Enka Network / Ambr.top
 */

export interface CharacterMeta {
  name: string;
  abbr: string; // 简称 (用于列表显示)
  element: string;
  rarity: number;
  weaponType: string;
}

/** 原神角色 ID → 元数据 */
export const GS_CHARACTERS: Record<number, CharacterMeta> = {
  // ─── 5★ 限定 ──────────────────────────────────────
  10000002: { name: '神里绫华', abbr: '绫华', element: '冰', rarity: 5, weaponType: '单手剑' },
  10000003: { name: '琴', abbr: '琴', element: '风', rarity: 5, weaponType: '单手剑' },
  10000005: { name: '空', abbr: '空', element: '风', rarity: 5, weaponType: '单手剑' },
  10000006: { name: '丽莎', abbr: '丽莎', element: '雷', rarity: 4, weaponType: '法器' },
  10000007: { name: '荧', abbr: '荧', element: '风', rarity: 5, weaponType: '单手剑' },
  10000014: { name: '芭芭拉', abbr: '芭芭拉', element: '水', rarity: 4, weaponType: '法器' },
  10000015: { name: '凯亚', abbr: '凯亚', element: '冰', rarity: 4, weaponType: '单手剑' },
  10000016: { name: '迪卢克', abbr: '迪卢克', element: '火', rarity: 5, weaponType: '双手剑' },
  10000020: { name: '雷泽', abbr: '雷泽', element: '雷', rarity: 4, weaponType: '双手剑' },
  10000021: { name: '安柏', abbr: '安柏', element: '火', rarity: 4, weaponType: '弓' },
  10000022: { name: '温迪', abbr: '温迪', element: '风', rarity: 5, weaponType: '弓' },
  10000023: { name: '香菱', abbr: '香菱', element: '火', rarity: 4, weaponType: '长柄武器' },
  10000024: { name: '北斗', abbr: '北斗', element: '雷', rarity: 4, weaponType: '双手剑' },
  10000025: { name: '行秋', abbr: '行秋', element: '水', rarity: 4, weaponType: '单手剑' },
  10000026: { name: '魈', abbr: '魈', element: '风', rarity: 5, weaponType: '长柄武器' },
  10000027: { name: '凝光', abbr: '凝光', element: '岩', rarity: 4, weaponType: '法器' },
  10000029: { name: '可莉', abbr: '可莉', element: '火', rarity: 5, weaponType: '法器' },
  10000030: { name: '钟离', abbr: '钟离', element: '岩', rarity: 5, weaponType: '长柄武器' },
  10000031: { name: '菲谢尔', abbr: '皇女', element: '雷', rarity: 4, weaponType: '弓' },
  10000032: { name: '班尼特', abbr: '班尼特', element: '火', rarity: 4, weaponType: '单手剑' },
  10000033: { name: '达达利亚', abbr: '公子', element: '水', rarity: 5, weaponType: '弓' },
  10000034: { name: '诺艾尔', abbr: '诺艾尔', element: '岩', rarity: 4, weaponType: '双手剑' },
  10000035: { name: '七七', abbr: '七七', element: '冰', rarity: 5, weaponType: '单手剑' },
  10000036: { name: '重云', abbr: '重云', element: '冰', rarity: 4, weaponType: '双手剑' },
  10000037: { name: '甘雨', abbr: '甘雨', element: '冰', rarity: 5, weaponType: '弓' },
  10000038: { name: '阿贝多', abbr: '阿贝多', element: '岩', rarity: 5, weaponType: '单手剑' },
  10000039: { name: '刻晴', abbr: '刻晴', element: '雷', rarity: 5, weaponType: '单手剑' },
  10000041: { name: '莫娜', abbr: '莫娜', element: '水', rarity: 5, weaponType: '法器' },
  10000042: { name: '砂糖', abbr: '砂糖', element: '风', rarity: 4, weaponType: '法器' },
  10000043: { name: '辛焱', abbr: '辛焱', element: '火', rarity: 4, weaponType: '双手剑' },
  10000044: { name: '罗莎莉亚', abbr: '罗莎莉亚', element: '冰', rarity: 4, weaponType: '长柄武器' },
  10000045: { name: '胡桃', abbr: '胡桃', element: '火', rarity: 5, weaponType: '长柄武器' },
  10000046: { name: '枫原万叶', abbr: '万叶', element: '风', rarity: 5, weaponType: '单手剑' },
  10000047: { name: '烟绯', abbr: '烟绯', element: '火', rarity: 4, weaponType: '法器' },
  10000048: { name: '宵宫', abbr: '宵宫', element: '火', rarity: 5, weaponType: '弓' },
  10000049: { name: '托马', abbr: '托马', element: '火', rarity: 4, weaponType: '长柄武器' },
  10000050: { name: '雷电将军', abbr: '雷神', element: '雷', rarity: 5, weaponType: '长柄武器' },
  10000051: { name: '早柚', abbr: '早柚', element: '风', rarity: 4, weaponType: '双手剑' },
  10000052: { name: '珊瑚宫心海', abbr: '心海', element: '水', rarity: 5, weaponType: '法器' },
  10000053: { name: '五郎', abbr: '五郎', element: '岩', rarity: 4, weaponType: '弓' },
  10000054: { name: '九条裟罗', abbr: '九条', element: '雷', rarity: 4, weaponType: '弓' },
  10000055: { name: '荒�的�的泷', abbr: '荒泷', element: '岩', rarity: 5, weaponType: '双手剑' },
  10000056: { name: '久岐忍', abbr: '忍', element: '雷', rarity: 4, weaponType: '单手剑' },
  10000057: { name: '鹿野院平藏', abbr: '平藏', element: '风', rarity: 4, weaponType: '法器' },
  10000058: { name: '八重神子', abbr: '八重', element: '雷', rarity: 5, weaponType: '法器' },
  10000059: { name: '神里绫人', abbr: '绫人', element: '水', rarity: 5, weaponType: '单手剑' },
  10000060: { name: '夜兰', abbr: '夜兰', element: '水', rarity: 5, weaponType: '弓' },
  10000061: { name: '柯莱', abbr: '柯莱', element: '草', rarity: 4, weaponType: '弓' },
  10000062: { name: '多莉', abbr: '多莉', element: '雷', rarity: 4, weaponType: '双手剑' },
  10000063: { name: '提纳里', abbr: '提纳里', element: '草', rarity: 5, weaponType: '弓' },
  10000064: { name: '坎蒂丝', abbr: '坎蒂丝', element: '水', rarity: 4, weaponType: '长柄武器' },
  10000065: { name: '赛诺', abbr: '赛诺', element: '雷', rarity: 5, weaponType: '长柄武器' },
  10000066: { name: '妮露', abbr: '妮露', element: '水', rarity: 5, weaponType: '单手剑' },
  10000067: { name: '纳西妲', abbr: '纳西妲', element: '草', rarity: 5, weaponType: '法器' },
  10000068: { name: '莱依拉', abbr: '莱依拉', element: '冰', rarity: 4, weaponType: '单手剑' },
  10000069: { name: '流浪者', abbr: '散兵', element: '风', rarity: 5, weaponType: '法器' },
  10000070: { name: '珐露珊', abbr: '珐露珊', element: '风', rarity: 4, weaponType: '弓' },
  10000071: { name: '艾尔海森', abbr: '艾尔海森', element: '草', rarity: 5, weaponType: '单手剑' },
  10000072: { name: '迪希雅', abbr: '迪希雅', element: '火', rarity: 5, weaponType: '双手剑' },
  10000073: { name: '米卡', abbr: '米卡', element: '冰', rarity: 4, weaponType: '长柄武器' },
  10000074: { name: '卡维', abbr: '卡维', element: '草', rarity: 4, weaponType: '双手剑' },
  10000075: { name: '白术', abbr: '白术', element: '草', rarity: 5, weaponType: '法器' },
  10000076: { name: '林尼', abbr: '林尼', element: '火', rarity: 5, weaponType: '弓' },
  10000077: { name: '琳妮特', abbr: '琳妮特', element: '风', rarity: 4, weaponType: '单手剑' },
  10000078: { name: '菲米尼', abbr: '菲米尼', element: '冰', rarity: 4, weaponType: '双手剑' },
  10000079: { name: '莱欧斯利', abbr: '莱欧斯利', element: '冰', rarity: 5, weaponType: '法器' },
  10000080: { name: '那维莱特', abbr: '那维莱特', element: '水', rarity: 5, weaponType: '法器' },
  10000081: { name: '夏洛蒂', abbr: '夏洛蒂', element: '冰', rarity: 4, weaponType: '法器' },
  10000082: { name: '芙宁娜', abbr: '芙宁娜', element: '水', rarity: 5, weaponType: '单手剑' },
  10000083: { name: '夏沃蕾', abbr: '夏沃蕾', element: '火', rarity: 4, weaponType: '长柄武器' },
  10000084: { name: '娜维娅', abbr: '娜维娅', element: '岩', rarity: 5, weaponType: '双手剑' },
  10000085: { name: '嘉明', abbr: '嘉明', element: '火', rarity: 4, weaponType: '双手剑' },
  10000086: { name: '闲云', abbr: '闲云', element: '风', rarity: 5, weaponType: '法器' },
  10000087: { name: '千织', abbr: '千织', element: '岩', rarity: 5, weaponType: '单手剑' },
  10000088: { name: '希格雯', abbr: '希格雯', element: '水', rarity: 5, weaponType: '法器' },
  10000089: { name: '阿蕾奇诺', abbr: '阿蕾奇诺', element: '火', rarity: 5, weaponType: '长柄武器' },
  10000090: { name: '赛索斯', abbr: '赛索斯', element: '雷', rarity: 4, weaponType: '弓' },
  10000091: { name: '克洛琳德', abbr: '克洛琳德', element: '雷', rarity: 5, weaponType: '单手剑' },
  10000092: { name: '艾梅莉埃', abbr: '艾梅莉埃', element: '草', rarity: 5, weaponType: '长柄武器' },
  10000093: { name: '卡齐娜', abbr: '卡齐娜', element: '岩', rarity: 4, weaponType: '长柄武器' },
  10000094: { name: '基尼奇', abbr: '基尼奇', element: '草', rarity: 5, weaponType: '双手剑' },
  10000095: { name: '玛拉妮', abbr: '玛拉妮', element: '水', rarity: 5, weaponType: '法器' },
  10000096: { name: '希诺宁', abbr: '希诺宁', element: '岩', rarity: 4, weaponType: '双手剑' },
  10000097: { name: '恰斯卡', abbr: '恰斯卡', element: '风', rarity: 5, weaponType: '弓' },
  10000098: { name: '欧洛伦', abbr: '欧洛伦', element: '雷', rarity: 4, weaponType: '弓' },
  10000099: { name: '茜特菈莉', abbr: '茜特菈莉', element: '草', rarity: 5, weaponType: '法器' },
  10000100: { name: '玛薇卡', abbr: '玛薇卡', element: '火', rarity: 5, weaponType: '双手剑' },
  10000101: { name: '兰那罗', abbr: '兰那罗', element: '草', rarity: 4, weaponType: '弓' },
  10000102: { name: '瓦蕾莎', abbr: '瓦蕾莎', element: '冰', rarity: 5, weaponType: '双手剑' },
  10000103: { name: '伊安珊', abbr: '伊安珊', element: '风', rarity: 5, weaponType: '单手剑' }
};

/** Enka fightPropMap 属性 ID → 可读名/key */
export const FIGHT_PROP_MAP: Record<string, { name: string; key: string; isPercent?: boolean }> = {
  1: { name: '基础生命值', key: 'hpBase' },
  4: { name: '基础攻击力', key: 'atkBase' },
  7: { name: '基础防御力', key: 'defBase' },
  2000: { name: '生命值上限', key: 'hp' },
  2001: { name: '攻击力', key: 'atk' },
  2002: { name: '防御力', key: 'def' },
  20: { name: '暴击率', key: 'cpct', isPercent: true },
  22: { name: '暴击伤害', key: 'cdmg', isPercent: true },
  23: { name: '元素充能效率', key: 'recharge', isPercent: true },
  28: { name: '元素精通', key: 'mastery' },
  26: { name: '治疗加成', key: 'heal', isPercent: true },
  30: { name: '物理伤害加成', key: 'phyDmg', isPercent: true },
  40: { name: '火元素伤害加成', key: 'pyroDmg', isPercent: true },
  41: { name: '雷元素伤害加成', key: 'electroDmg', isPercent: true },
  42: { name: '水元素伤害加成', key: 'hydroDmg', isPercent: true },
  43: { name: '草元素伤害加成', key: 'dendroDmg', isPercent: true },
  44: { name: '风元素伤害加成', key: 'anemoDmg', isPercent: true },
  45: { name: '岩元素伤害加成', key: 'geoDmg', isPercent: true },
  46: { name: '冰元素伤害加成', key: 'cryoDmg', isPercent: true }
};

/** 根据角色 ID 获取角色元数据 */
export function getCharacterMeta(id: number): CharacterMeta {
  return (
    GS_CHARACTERS[id] ?? {
      name: `角色${id}`,
      abbr: `${id}`,
      element: '',
      rarity: 4,
      weaponType: ''
    }
  );
}

/** 根据名称模糊匹配角色 (用于 #角色名详情 命令) */
export function matchCharacterByName(name: string, candidates: { id: number; name: string }[]): { id: number; name: string } | null {
  // 精确匹配
  const exact = candidates.find(c => c.name === name);

  if (exact) {
    return exact;
  }

  // 包含匹配
  const include = candidates.find(c => c.name.includes(name) || name.includes(c.name));

  if (include) {
    return include;
  }

  // 简称匹配
  for (const c of candidates) {
    const meta = GS_CHARACTERS[c.id];

    if (meta && (meta.abbr === name || meta.name === name)) {
      return c;
    }
  }

  return null;
}
