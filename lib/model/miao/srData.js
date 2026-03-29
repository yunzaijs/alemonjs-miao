import { SR_CHARACTER_DATA } from '../../assets/sr/character/index.js';
import { ITEM_ICONS } from '../../assets/sr/icon_item/index.js';
import { SKILL_ICONS } from '../../assets/sr/icon_skill/index.js';
import { PATH_ICONS, ELEMENT_ICONS, STAR_ICON } from '../../assets/sr/img/index.js';
import itemsData from '../../assets/sr/items/data.json.js';

const BASE_ATTR_NAMES = {
    atk: '攻击力',
    hp: '生命值',
    def: '防御力',
    speed: '速度',
    cpct: '暴击率',
    cdmg: '暴击伤害',
    aggro: '嘲讽'
};
function resolveIcon(iconPath) {
    if (!iconPath) {
        return '';
    }
    return SKILL_ICONS[iconPath] ?? ITEM_ICONS[iconPath] ?? '';
}
function loadSrCharacter(name) {
    const raw = SR_CHARACTER_DATA[name];
    if (!raw) {
        return null;
    }
    const baseAttr = [{ key: 'sp', name: '能量', num: raw.sp ?? 0 }];
    if (raw.baseAttr) {
        for (const [key, val] of Object.entries(raw.baseAttr)) {
            baseAttr.push({
                key,
                name: BASE_ATTR_NAMES[key] ?? key,
                num: Math.floor(Number(val))
            });
        }
    }
    const skills = [];
    if (raw.skillsData && typeof raw.skillsData === 'object') {
        for (const [, val] of Object.entries(raw.skillsData)) {
            const sd = val;
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
    const eidolons = [];
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
    const materialMap = new Map();
    if (Array.isArray(raw.materials)) {
        for (const group of raw.materials) {
            if (!Array.isArray(group)) {
                continue;
            }
            for (const m of group) {
                const existing = materialMap.get(String(m.id));
                if (existing) {
                    existing.num += m.num;
                }
                else {
                    materialMap.set(String(m.id), { num: m.num });
                }
            }
        }
    }
    const materials = [];
    for (const [id, { num }] of materialMap) {
        const item = itemsData[id];
        if (!item) {
            continue;
        }
        materials.push({
            id,
            name: item.name,
            num,
            rarity: item.rarity ?? 3,
            icon: resolveIcon(item.icon ?? '')
        });
    }
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
function srElementIcon(element) {
    return ELEMENT_ICONS[element] ?? '';
}
function srPathIcon(pathName) {
    return PATH_ICONS[pathName] ?? '';
}
function srStarIcon() {
    return STAR_ICON;
}

export { loadSrCharacter, srElementIcon, srPathIcon, srStarIcon };
