import { getCharacterFace } from '../../assets/character/index.js';
import { getCharacterMeta, FIGHT_PROP_MAP } from './characters.js';

const ENKA_GS_URL = 'https://enka.network/api/uid';
const ENKA_GS_MIRROR = 'http://profile.microgg.cn/api/uid';
const EQUIP_TYPE_POS = {
    EQUIP_BRACER: 1,
    EQUIP_NECKLACE: 2,
    EQUIP_SHOES: 3,
    EQUIP_RING: 4,
    EQUIP_DRESS: 5
};
const ARTIFACT_PROP_NAME = {
    FIGHT_PROP_HP: '生命值',
    FIGHT_PROP_HP_PERCENT: '生命值',
    FIGHT_PROP_ATTACK: '攻击力',
    FIGHT_PROP_ATTACK_PERCENT: '攻击力',
    FIGHT_PROP_DEFENSE: '防御力',
    FIGHT_PROP_DEFENSE_PERCENT: '防御力',
    FIGHT_PROP_CRITICAL: '暴击率',
    FIGHT_PROP_CRITICAL_HURT: '暴击伤害',
    FIGHT_PROP_CHARGE_EFFICIENCY: '元素充能效率',
    FIGHT_PROP_ELEMENT_MASTERY: '元素精通',
    FIGHT_PROP_HEAL_ADD: '治疗加成',
    FIGHT_PROP_PHYSICAL_ADD_HURT: '物理伤害加成',
    FIGHT_PROP_FIRE_ADD_HURT: '火元素伤害加成',
    FIGHT_PROP_ELEC_ADD_HURT: '雷元素伤害加成',
    FIGHT_PROP_WATER_ADD_HURT: '水元素伤害加成',
    FIGHT_PROP_GRASS_ADD_HURT: '草元素伤害加成',
    FIGHT_PROP_WIND_ADD_HURT: '风元素伤害加成',
    FIGHT_PROP_ROCK_ADD_HURT: '岩元素伤害加成',
    FIGHT_PROP_ICE_ADD_HURT: '冰元素伤害加成'
};
function fmtPropValue(propId, value) {
    const isPercent = /_PERCENT|CRITICAL|CHARGE_EFFICIENCY|HEAL_ADD|_ADD_HURT/.test(propId);
    return isPercent ? `${(value * 100).toFixed(1)}%` : Math.floor(value).toString();
}
function extractStats(fightProps) {
    const stats = [];
    const entries = [
        ['2000', '1'],
        ['2001', '4'],
        ['2002', '7'],
        ['28', ''],
        ['20', ''],
        ['22', ''],
        ['23', '']
    ];
    for (const [totalKey, baseKey] of entries) {
        const prop = FIGHT_PROP_MAP[totalKey];
        if (!prop) {
            continue;
        }
        const total = fightProps[totalKey] ?? 0;
        const entry = {
            name: prop.name,
            key: prop.key,
            value: prop.isPercent ? `${(total * 100).toFixed(1)}%` : Math.floor(total).toString()
        };
        if (baseKey) {
            const base = fightProps[baseKey] ?? 0;
            const plus = total - base;
            entry.base = Math.floor(base).toString();
            entry.plus = Math.floor(plus).toString();
        }
        stats.push(entry);
    }
    let maxDmg = 0;
    let maxDmgKey = '30';
    for (const key of ['30', '40', '41', '42', '43', '44', '45', '46']) {
        const val = fightProps[key] ?? 0;
        if (val > maxDmg) {
            maxDmg = val;
            maxDmgKey = key;
        }
    }
    if (maxDmg > 0) {
        const prop = FIGHT_PROP_MAP[maxDmgKey];
        if (prop) {
            stats.push({
                name: prop.name,
                key: prop.key,
                value: `${(maxDmg * 100).toFixed(1)}%`
            });
        }
    }
    return stats;
}
async function fetchEnkaGS(uid) {
    const isCN = /^[125]/.test(uid);
    const baseUrl = isCN ? ENKA_GS_MIRROR : ENKA_GS_URL;
    const res = await fetch(`${baseUrl}/${encodeURIComponent(uid)}`, {
        headers: { 'User-Agent': 'alemonjs-miao/1.0' },
        signal: AbortSignal.timeout(15000)
    }).catch(() => null);
    if (!res?.ok) {
        return null;
    }
    const json = await res.json().catch(() => null);
    if (!json?.playerInfo) {
        return null;
    }
    const avatars = [];
    if (json.avatarInfoList) {
        for (const av of json.avatarInfoList) {
            const avatarId = av.avatarId;
            const meta = getCharacterMeta(avatarId);
            const level = Number(av.propMap?.['4001']?.val ?? 0);
            const consCount = av.talentIdList?.length ?? 0;
            const fetter = av.fetterInfo?.expLevel ?? 0;
            let talent;
            if (av.skillLevelMap) {
                const skillKeys = Object.keys(av.skillLevelMap);
                talent = {
                    a: av.skillLevelMap[skillKeys[0]] ?? 0,
                    e: av.skillLevelMap[skillKeys[1]] ?? 0,
                    q: av.skillLevelMap[skillKeys[2]] ?? 0
                };
            }
            const stats = av.fightPropMap ? extractStats(av.fightPropMap) : undefined;
            let weapon;
            const artifacts = [];
            if (av.equipList) {
                for (const equip of av.equipList) {
                    if (equip.flat?.itemType === 'ITEM_WEAPON') {
                        const affixMap = equip.weapon?.affixMap ?? {};
                        const affixLevel = Object.values(affixMap)[0];
                        weapon = {
                            name: equip.flat.nameTextMapHash ?? '',
                            icon: `https://enka.network/ui/${equip.flat.icon}.png`,
                            level: equip.weapon?.level ?? 1,
                            rarity: equip.flat.rankLevel ?? 4,
                            affix: (affixLevel ?? 0) + 1
                        };
                    }
                    else if (equip.flat?.itemType === 'ITEM_RELIQUARY') {
                        const pos = EQUIP_TYPE_POS[equip.flat.equipType ?? ''] ?? 0;
                        const mainStat = equip.flat.reliquaryMainstat;
                        const subStats = [];
                        if (equip.flat.reliquarySubstats) {
                            for (const sub of equip.flat.reliquarySubstats) {
                                const propId = sub.appendPropId ?? '';
                                subStats.push({
                                    key: propId,
                                    name: ARTIFACT_PROP_NAME[propId] ?? propId,
                                    value: fmtPropValue(propId, sub.statValue ?? 0)
                                });
                            }
                        }
                        artifacts.push({
                            pos,
                            name: equip.flat.nameTextMapHash ?? '',
                            setName: equip.flat.setNameTextMapHash ?? '',
                            icon: `https://enka.network/ui/${equip.flat.icon}.png`,
                            rarity: equip.flat.rankLevel ?? 5,
                            level: (equip.reliquary?.level ?? 1) - 1,
                            mainKey: mainStat?.mainPropId ?? '',
                            mainName: ARTIFACT_PROP_NAME[mainStat?.mainPropId ?? ''] ?? '',
                            mainValue: fmtPropValue(mainStat?.mainPropId ?? '', mainStat?.statValue ?? 0),
                            subStats
                        });
                    }
                }
            }
            avatars.push({
                id: avatarId,
                name: meta.name,
                abbr: meta.abbr,
                element: meta.element,
                rarity: meta.rarity,
                level,
                cons: consCount,
                fetter,
                icon: getCharacterFace('gs', meta.name) ?? `https://enka.network/ui/UI_AvatarIcon_Side_${avatarId}.png`,
                sideIcon: getCharacterFace('gs', meta.name) ?? `https://enka.network/ui/UI_AvatarIcon_Side_${avatarId}.png`,
                weapon,
                talent,
                stats,
                artifacts: artifacts.length > 0 ? artifacts : undefined
            });
        }
    }
    return {
        uid,
        nickname: json.playerInfo.nickname ?? '',
        level: json.playerInfo.level ?? 0,
        signature: json.playerInfo.signature ?? '',
        avatars,
        updateTime: new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })
    };
}
const MIHOMO_URL = 'https://api.mihomo.me/sr_info';
const SR_STAT_MAP = {
    hp: '生命值',
    atk: '攻击力',
    def: '防御力',
    spd: '速度',
    crit_rate: '暴击率',
    crit_dmg: '暴击伤害',
    break_dmg: '击破特攻',
    heal_rate: '治疗量加成',
    sp_rate: '能量恢复效率',
    effect_hit: '效果命中',
    effect_res: '效果抵抗'
};
async function fetchMihomoSR(uid) {
    const res = await fetch(`${MIHOMO_URL}/${encodeURIComponent(uid)}?lang=cn`, {
        headers: { 'User-Agent': 'alemonjs-miao/1.0' },
        signal: AbortSignal.timeout(15000)
    }).catch(() => null);
    if (!res?.ok) {
        return null;
    }
    const json = await res.json().catch(() => null);
    if (!json?.player) {
        return null;
    }
    const avatars = [];
    if (json.characters) {
        for (const ch of json.characters) {
            let weapon;
            if (ch.light_cone) {
                weapon = {
                    name: ch.light_cone.name ?? '',
                    icon: ch.light_cone.icon ?? '',
                    level: ch.light_cone.level ?? 1,
                    rarity: ch.light_cone.rarity ?? 4,
                    affix: ch.light_cone.rank ?? 1
                };
            }
            let talent;
            if (ch.skills?.length >= 3) {
                talent = {
                    a: ch.skills[0]?.level ?? 0,
                    e: ch.skills[1]?.level ?? 0,
                    q: ch.skills[2]?.level ?? 0
                };
            }
            const stats = [];
            if (ch.attributes) {
                for (const attr of ch.attributes) {
                    const name = SR_STAT_MAP[attr.field] ?? attr.name ?? attr.field;
                    stats.push({
                        name,
                        key: attr.field ?? '',
                        value: attr.display ?? String(attr.value ?? 0)
                    });
                }
            }
            if (ch.additions) {
                for (const add of ch.additions) {
                    const existing = stats.find(s => s.key === add.field);
                    if (existing) {
                        existing.value = add.display ?? String(add.value ?? 0);
                    }
                    else {
                        stats.push({
                            name: SR_STAT_MAP[add.field] ?? add.name ?? add.field,
                            key: add.field ?? '',
                            value: add.display ?? String(add.value ?? 0)
                        });
                    }
                }
            }
            const artifacts = [];
            if (ch.relics) {
                for (const relic of ch.relics) {
                    const subStats = [];
                    if (relic.sub_affix) {
                        for (const sub of relic.sub_affix) {
                            subStats.push({
                                key: sub.field ?? '',
                                name: sub.name ?? '',
                                value: sub.display ?? String(sub.value ?? 0)
                            });
                        }
                    }
                    artifacts.push({
                        pos: (relic.type ?? 1),
                        name: relic.name ?? '',
                        setName: relic.set_name ?? '',
                        icon: relic.icon ?? '',
                        rarity: relic.rarity ?? 5,
                        level: relic.level ?? 0,
                        mainKey: relic.main_affix?.field ?? '',
                        mainName: relic.main_affix?.name ?? '',
                        mainValue: relic.main_affix?.display ?? '',
                        subStats
                    });
                }
            }
            const chName = ch.name ?? '';
            avatars.push({
                id: Number(ch.id),
                name: chName,
                abbr: chName,
                element: ch.element?.name ?? '',
                rarity: ch.rarity ?? 5,
                level: ch.level ?? 0,
                cons: ch.rank ?? 0,
                fetter: 0,
                icon: getCharacterFace('sr', chName) ?? ch.icon ?? '',
                sideIcon: getCharacterFace('sr', chName) ?? ch.icon ?? '',
                weapon,
                talent,
                stats: stats.length > 0 ? stats : undefined,
                artifacts: artifacts.length > 0 ? artifacts : undefined
            });
        }
    }
    return {
        uid,
        nickname: json.player.nickname ?? '',
        level: json.player.level ?? 0,
        signature: json.player.signature ?? '',
        avatars,
        updateTime: new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })
    };
}
function fetchProfile(uid, game) {
    if (game === 'sr') {
        return fetchMihomoSR(uid);
    }
    return fetchEnkaGS(uid);
}

export { fetchEnkaGS, fetchMihomoSR, fetchProfile };
