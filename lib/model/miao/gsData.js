import { GS_CHARACTER_DATA } from '../../assets/gs/character/index.js';

const GROW_ATTR_NAMES = {
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
const TALENT_LABELS = {
    a: '普通攻击',
    e: '元素战技',
    q: '元素爆发'
};
function loadGsCharacter(name) {
    const raw = GS_CHARACTER_DATA[name];
    if (!raw) {
        return null;
    }
    const talents = [];
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
                tableNames: Array.isArray(t.tables) ? t.tables.map((tb) => tb.name) : []
            });
        }
    }
    const passives = [];
    if (Array.isArray(raw.passive)) {
        for (const p of raw.passive) {
            passives.push({
                name: p.name ?? '',
                desc: Array.isArray(p.desc) ? p.desc : []
            });
        }
    }
    const constellations = [];
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
        birthday: raw.birth ?? '',
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
function growAttrName(key) {
    return GROW_ATTR_NAMES[key] ?? key;
}

export { growAttrName, loadGsCharacter };
