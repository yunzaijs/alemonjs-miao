import React from 'react';
import HTML from './HTML.js';
import { elemBgUrl, FONT_FAMILY, FONT_NZBZ, contStyle, contTitleStyle } from './shared.js';

const GS_TALENT_MATERIALS = [
    { name: '自由', region: '蒙德', domain: '忘却之峡', week: 1, type: 'talent' },
    { name: '抗争', region: '蒙德', domain: '忘却之峡', week: 2, type: 'talent' },
    { name: '诗文', region: '蒙德', domain: '忘却之峡', week: 3, type: 'talent' },
    { name: '繁荣', region: '璃月', domain: '太山府', week: 1, type: 'talent' },
    { name: '勤劳', region: '璃月', domain: '太山府', week: 2, type: 'talent' },
    { name: '黄金', region: '璃月', domain: '太山府', week: 3, type: 'talent' },
    { name: '浮世', region: '稻妻', domain: '菫色之庭', week: 1, type: 'talent' },
    { name: '风雅', region: '稻妻', domain: '菫色之庭', week: 2, type: 'talent' },
    { name: '天光', region: '稻妻', domain: '菫色之庭', week: 3, type: 'talent' },
    { name: '诤言', region: '须弥', domain: '昏识塔', week: 1, type: 'talent' },
    { name: '巧思', region: '须弥', domain: '昏识塔', week: 2, type: 'talent' },
    { name: '笃行', region: '须弥', domain: '昏识塔', week: 3, type: 'talent' },
    { name: '公平', region: '枫丹', domain: '苍白的遗荣', week: 1, type: 'talent' },
    { name: '正义', region: '枫丹', domain: '苍白的遗荣', week: 2, type: 'talent' },
    { name: '秩序', region: '枫丹', domain: '苍白的遗荣', week: 3, type: 'talent' },
    { name: '竞争', region: '纳塔', domain: '荣花之期', week: 1, type: 'talent' },
    { name: '燃焰', region: '纳塔', domain: '荣花之期', week: 2, type: 'talent' },
    { name: '冲突', region: '纳塔', domain: '荣花之期', week: 3, type: 'talent' }
];
const GS_WEAPON_MATERIALS = [
    { name: '高塔孤王', region: '蒙德', domain: '塞西莉亚苗圃', week: 1, type: 'weapon' },
    { name: '凛风奔狼', region: '蒙德', domain: '塞西莉亚苗圃', week: 2, type: 'weapon' },
    { name: '狮牙斗士', region: '蒙德', domain: '塞西莉亚苗圃', week: 3, type: 'weapon' },
    { name: '孤云寒林', region: '璃月', domain: '震雷连山密宫', week: 1, type: 'weapon' },
    { name: '雾海云间', region: '璃月', domain: '震雷连山密宫', week: 2, type: 'weapon' },
    { name: '漆黑陨铁', region: '璃月', domain: '震雷连山密宫', week: 3, type: 'weapon' },
    { name: '鸣神御灵', region: '稻妻', domain: '砂流之庭', week: 1, type: 'weapon' },
    { name: '今昔剧画', region: '稻妻', domain: '砂流之庭', week: 2, type: 'weapon' },
    { name: '远海夷地', region: '稻妻', domain: '砂流之庭', week: 3, type: 'weapon' },
    { name: '绿洲花园', region: '须弥', domain: '有顶塔', week: 1, type: 'weapon' },
    { name: '纯圣露滴', region: '须弥', domain: '有顶塔', week: 2, type: 'weapon' },
    { name: '烈日威权', region: '须弥', domain: '有顶塔', week: 3, type: 'weapon' },
    { name: '悠古弦音', region: '枫丹', domain: '深潮的余响', week: 1, type: 'weapon' },
    { name: '纯露之心', region: '枫丹', domain: '深潮的余响', week: 2, type: 'weapon' },
    { name: '纯圣之泪', region: '枫丹', domain: '深潮的余响', week: 3, type: 'weapon' },
    { name: '炽热之心', region: '纳塔', domain: '焰色的记忆', week: 1, type: 'weapon' },
    { name: '夜风呢喃', region: '纳塔', domain: '焰色的记忆', week: 2, type: 'weapon' },
    { name: '圣灵之纪', region: '纳塔', domain: '焰色的记忆', week: 3, type: 'weapon' }
];
const WEEK_LABELS = {
    1: '周一/周四',
    2: '周二/周五',
    3: '周三/周六',
    0: '周日 (全部可刷)'
};
const DAY_LABELS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
const REGION_COLORS = {
    蒙德: '#5ec4b6',
    璃月: '#c6923a',
    稻妻: '#b47cc6',
    须弥: '#7cb342',
    枫丹: '#42a5f5',
    纳塔: '#ef5350'
};
function getMaterialWeek(weekday) {
    if (weekday === 0) {
        return 0;
    }
    return ((weekday - 1) % 3) + 1;
}
function groupByRegion(talents, weapons) {
    const regionOrder = ['蒙德', '璃月', '稻妻', '须弥', '枫丹', '纳塔'];
    const map = new Map();
    for (const r of regionOrder) {
        map.set(r, { region: r, talents: [], weapons: [] });
    }
    for (const t of talents) {
        map.get(t.region)?.talents.push(t);
    }
    for (const w of weapons) {
        map.get(w.region)?.weapons.push(w);
    }
    return regionOrder.map(r => map.get(r)).filter(g => g.talents.length > 0 || g.weapons.length > 0);
}
function MaterialItem({ mat, color }) {
    return (React.createElement("div", { style: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 10px',
            background: 'rgba(0,0,0,0.15)',
            borderRadius: '6px',
            flex: 1,
            minWidth: '160px'
        } },
        React.createElement("div", { style: {
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: color,
                flexShrink: 0
            } }),
        React.createElement("div", { style: { flex: 1 } },
            React.createElement("div", { style: { fontSize: '14px', fontWeight: 'bold' } },
                mat.type === 'talent' ? '「' : '',
                mat.name,
                mat.type === 'talent' ? '」' : ''),
            React.createElement("div", { style: { fontSize: '11px', opacity: 0.6 } }, mat.domain)),
        React.createElement("div", { style: {
                fontSize: '10px',
                padding: '2px 6px',
                borderRadius: '8px',
                background: mat.type === 'talent' ? 'rgba(156,39,176,0.4)' : 'rgba(33,150,243,0.4)',
                color: '#fff'
            } }, mat.type === 'talent' ? '天赋' : '武器')));
}
function RegionSection({ group, isSunday }) {
    const color = REGION_COLORS[group.region] ?? '#888';
    return (React.createElement("div", { style: contStyle({ padding: '0' }) },
        React.createElement("div", { style: contTitleStyle({
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }) },
            React.createElement("span", { style: {
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    background: color,
                    display: 'inline-block'
                } }),
            React.createElement("span", { style: { fontFamily: FONT_NZBZ, fontSize: '18px' } }, group.region),
            isSunday && React.createElement("span", { style: { fontSize: '12px', opacity: 0.5, marginLeft: 'auto' } }, "\u5168\u90E8\u7D20\u6750\u53EF\u5237")),
        React.createElement("div", { style: { padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: '6px' } },
            group.talents.map((t, i) => (React.createElement(MaterialItem, { key: `t-${i}`, mat: t, color: color }))),
            group.weapons.map((w, i) => (React.createElement(MaterialItem, { key: `w-${i}`, mat: w, color: color }))))));
}
function MaterialCard({ data }) {
    const week = getMaterialWeek(data.weekday);
    const isSunday = data.weekday === 0;
    const dayText = DAY_LABELS[data.weekday] ?? '未知';
    const talents = isSunday ? GS_TALENT_MATERIALS : GS_TALENT_MATERIALS.filter(m => m.week === week);
    const weapons = isSunday ? GS_WEAPON_MATERIALS : GS_WEAPON_MATERIALS.filter(m => m.week === week);
    const groups = groupByRegion(talents, weapons);
    return (React.createElement(HTML, { style: { width: '600px' } },
        React.createElement("div", { style: {
                fontFamily: FONT_FAMILY,
                color: '#fff',
                backgroundImage: `url(${elemBgUrl()})`,
                backgroundSize: 'cover',
                backgroundPosition: 'left top',
                position: 'relative',
                paddingBottom: '10px'
            } },
            React.createElement("div", { style: {
                    position: 'relative',
                    padding: '20px 20px 10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end'
                } },
                React.createElement("div", null,
                    React.createElement("div", { style: { fontFamily: FONT_NZBZ, fontSize: '28px', color: '#d3bc8e' } },
                        "#",
                        data.dayLabel,
                        "\u7D20\u6750"),
                    React.createElement("div", { style: { fontSize: '13px', opacity: 0.6, marginTop: '4px' } },
                        dayText,
                        " \u00B7 ",
                        WEEK_LABELS[week])),
                React.createElement("div", { style: { fontSize: '13px', opacity: 0.5 } }, "\u539F\u795E")),
            React.createElement("div", { style: { position: 'relative' } }, groups.map(g => (React.createElement(RegionSection, { key: g.region, group: g, isSunday: isSunday })))),
            React.createElement("div", { style: {
                    position: 'relative',
                    textAlign: 'right',
                    padding: '8px 20px',
                    fontSize: '12px',
                    opacity: 0.4
                } }, "Miao By ALemonJS"))));
}

export { MaterialCard as default };
