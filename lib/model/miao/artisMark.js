const GRADE_THRESHOLDS = [
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
function getGrade(mark) {
    for (const [threshold, grade, color] of GRADE_THRESHOLDS) {
        if (mark >= threshold) {
            return { grade, color };
        }
    }
    return { grade: 'D', color: '#9e9e9e' };
}
const SUB_STAT_UNIT = {
    暴击率: 3.9,
    暴击伤害: 7.8,
    攻击力: 5.8,
    生命值: 5.8,
    防御力: 7.3,
    元素精通: 23.1,
    元素充能效率: 6.5,
    atk: 19.5,
    hp: 299,
    def: 23.1
};
const DPS_WEIGHTS = {
    暴击率: 100,
    暴击伤害: 100,
    攻击力: 75,
    生命值: 0,
    防御力: 0,
    元素精通: 0,
    元素充能效率: 30
};
const HP_DPS_WEIGHTS = {
    暴击率: 100,
    暴击伤害: 100,
    攻击力: 0,
    生命值: 80,
    防御力: 0,
    元素精通: 25,
    元素充能效率: 30
};
const DEF_DPS_WEIGHTS = {
    暴击率: 100,
    暴击伤害: 100,
    攻击力: 0,
    生命值: 0,
    防御力: 80,
    元素精通: 0,
    元素充能效率: 30
};
const EM_DPS_WEIGHTS = {
    暴击率: 100,
    暴击伤害: 100,
    攻击力: 50,
    生命值: 0,
    防御力: 0,
    元素精通: 75,
    元素充能效率: 30
};
const SUPPORT_WEIGHTS = {
    暴击率: 50,
    暴击伤害: 50,
    攻击力: 50,
    生命值: 80,
    防御力: 0,
    元素精通: 0,
    元素充能效率: 75
};
const HEAL_WEIGHTS = {
    暴击率: 0,
    暴击伤害: 0,
    攻击力: 50,
    生命值: 100,
    防御力: 0,
    元素精通: 0,
    元素充能效率: 55
};
const CHAR_WEIGHT_MAP = {
    胡桃: HP_DPS_WEIGHTS,
    夜兰: HP_DPS_WEIGHTS,
    珊瑚宫心海: HEAL_WEIGHTS,
    芙宁娜: HP_DPS_WEIGHTS,
    荒泷一斗: DEF_DPS_WEIGHTS,
    诺艾尔: DEF_DPS_WEIGHTS,
    阿贝多: DEF_DPS_WEIGHTS,
    五郎: { ...SUPPORT_WEIGHTS, 防御力: 80 },
    提纳里: EM_DPS_WEIGHTS,
    纳西妲: EM_DPS_WEIGHTS,
    钟离: SUPPORT_WEIGHTS,
    班尼特: SUPPORT_WEIGHTS,
    万叶: { ...SUPPORT_WEIGHTS, 元素精通: 100, 暴击率: 0, 暴击伤害: 0 },
    温迪: { ...SUPPORT_WEIGHTS, 元素精通: 80 },
    七七: HEAL_WEIGHTS,
    芭芭拉: HEAL_WEIGHTS,
    早柚: HEAL_WEIGHTS
};
function getCharWeights(name) {
    return CHAR_WEIGHT_MAP[name] ?? DPS_WEIGHTS;
}
function normalizeSubKey(name) {
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
function isPercentSub(sub) {
    return sub.value.includes('%');
}
function parseSubValue(sub) {
    return parseFloat(sub.value.replace('%', '')) || 0;
}
function scoreArtifact(art, charName) {
    const weights = getCharWeights(charName);
    const subScores = [];
    let totalMark = 0;
    for (const sub of art.subStats) {
        const key = normalizeSubKey(sub.name);
        if (!key) {
            subScores.push({ name: sub.name, score: 0 });
            continue;
        }
        const weight = weights[key] ?? 0;
        if (weight === 0) {
            subScores.push({ name: sub.name, score: 0 });
            continue;
        }
        const value = parseSubValue(sub);
        const isPct = isPercentSub(sub);
        let unitKey = key;
        if (!isPct && (key === '攻击力' || key === '生命值' || key === '防御力')) {
            unitKey = key === '攻击力' ? 'atk' : key === '生命值' ? 'hp' : 'def';
        }
        const unit = SUB_STAT_UNIT[unitKey] ?? 1;
        const rolls = value / unit;
        const score = (rolls * weight) / 100;
        subScores.push({ name: sub.name, score: Math.round(score * 10) / 10 });
        totalMark += score;
    }
    const normalizedMark = Math.round(totalMark * 10) / 10;
    return {
        mark: normalizedMark,
        grade: getGrade(normalizedMark),
        subScores
    };
}
function scoreCharacterArtifacts(avatar) {
    const arts = avatar.artifacts ?? [];
    const artifacts = [];
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

export { getGrade, scoreArtifact, scoreCharacterArtifacts };
