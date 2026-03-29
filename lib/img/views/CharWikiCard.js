import React from 'react';
import HTML from './HTML.js';
import { ELEMENT_COLORS, ELEM_BG, FONT_FAMILY, FONT_NZBZ, contStyle, contTitleStyle, RARITY_COLORS } from './shared.js';

const WEAPON_ICONS = {
    单手剑: '🗡️',
    双手剑: '⚔️',
    长柄武器: '🔱',
    弓: '🏹',
    法器: '📖'
};
const MODE_LABELS = {
    wiki: '角色资料',
    talent: '角色天赋',
    cons: '角色命座'
};
const TALENT_TYPES = [
    { key: 'a', label: '普通攻击', icon: '⚔️', desc: '进行普通攻击与重击' },
    { key: 'e', label: '元素战技', icon: '🔮', desc: '施放元素战技造成元素伤害' },
    { key: 'q', label: '元素爆发', icon: '💫', desc: '施放元素爆发造成大量伤害' },
    { key: 'p1', label: '固有天赋 1', icon: '📜', desc: '角色解锁即拥有的被动天赋' },
    { key: 'p2', label: '固有天赋 2', icon: '📜', desc: '突破后解锁的被动天赋' }
];
const CONS_LABELS = ['第一层', '第二层', '第三层', '第四层', '第五层', '第六层'];
const CONS_ICONS = ['①', '②', '③', '④', '⑤', '⑥'];
const CONS_GRADE_COLORS = ['#5cbac2', '#339d61', '#3e95b9', '#3955b7', '#531ba9', '#ff5722'];
function StarRow({ rarity }) {
    const color = RARITY_COLORS[rarity] ?? '#888';
    return (React.createElement("div", { style: { display: 'flex', gap: '2px', marginTop: '4px' } }, Array.from({ length: rarity }).map((_, i) => (React.createElement("span", { key: i, style: { fontSize: '18px', color, textShadow: `0 0 4px ${color}` } }, "\u2605")))));
}
function InfoRow({ label, value }) {
    return (React.createElement("div", { style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 16px',
            background: 'rgba(0,0,0,0.15)',
            borderRadius: '6px'
        } },
        React.createElement("span", { style: { fontSize: '14px', opacity: 0.7 } }, label),
        React.createElement("span", { style: { fontSize: '15px', fontWeight: 'bold' } }, value)));
}
function TalentSection({ element }) {
    const elemColor = ELEMENT_COLORS[element] ?? '#888';
    return (React.createElement("div", { style: { display: 'flex', flexDirection: 'column', gap: '4px' } }, TALENT_TYPES.map(t => (React.createElement("div", { key: t.key, style: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 14px',
            background: 'rgba(0,0,0,0.15)',
            borderRadius: '6px',
            borderLeft: `3px solid ${elemColor}`
        } },
        React.createElement("span", { style: { fontSize: '22px', flexShrink: 0 } }, t.icon),
        React.createElement("div", { style: { flex: 1 } },
            React.createElement("div", { style: { fontSize: '14px', fontWeight: 'bold' } }, t.label),
            React.createElement("div", { style: { fontSize: '12px', opacity: 0.5, marginTop: '2px' } }, t.desc)))))));
}
function ConsSection() {
    return (React.createElement("div", { style: { display: 'flex', flexDirection: 'column', gap: '4px' } }, CONS_LABELS.map((label, i) => (React.createElement("div", { key: i, style: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 14px',
            background: 'rgba(0,0,0,0.15)',
            borderRadius: '6px',
            borderLeft: `3px solid ${CONS_GRADE_COLORS[i]}`
        } },
        React.createElement("span", { style: {
                fontSize: '20px',
                fontWeight: 'bold',
                color: CONS_GRADE_COLORS[i],
                width: '28px',
                textAlign: 'center',
                flexShrink: 0
            } }, CONS_ICONS[i]),
        React.createElement("div", { style: { flex: 1 } },
            React.createElement("div", { style: { fontSize: '14px', fontWeight: 'bold' } }, label),
            React.createElement("div", { style: { fontSize: '12px', opacity: 0.5, marginTop: '2px' } },
                "\u547D\u4E4B\u5EA7 \u00B7 \u7B2C",
                i + 1,
                "\u91CD")))))));
}
function CharWikiCard({ data }) {
    const elemColor = ELEMENT_COLORS[data.element] ?? '#888';
    const bgUrl = ELEM_BG[data.element] ?? ELEM_BG['风'];
    return (React.createElement(HTML, { style: { width: '500px' } },
        React.createElement("div", { style: {
                fontFamily: FONT_FAMILY,
                color: '#fff',
                backgroundImage: `url(${bgUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'left top',
                position: 'relative',
                paddingBottom: '10px'
            } },
            React.createElement("div", { style: {
                    position: 'relative',
                    padding: '20px',
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'flex-start'
                } },
                React.createElement("div", { style: {
                        width: '120px',
                        height: '120px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        border: `3px solid ${elemColor}`,
                        boxShadow: `0 0 12px ${elemColor}40`,
                        flexShrink: 0,
                        background: 'rgba(0,0,0,0.3)'
                    } }, data.faceImg ? (React.createElement("img", { src: data.faceImg, style: { width: '100%', height: '100%', objectFit: 'cover' } })) : (React.createElement("div", { style: {
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '40px',
                        opacity: 0.3
                    } }, "?"))),
                React.createElement("div", { style: { flex: 1 } },
                    React.createElement("div", { style: { fontFamily: FONT_NZBZ, fontSize: '28px', color: '#d3bc8e' } }, data.name),
                    data.abbr !== data.name && React.createElement("div", { style: { fontSize: '13px', opacity: 0.5, marginTop: '2px' } }, data.abbr),
                    React.createElement(StarRow, { rarity: data.rarity }),
                    React.createElement("div", { style: { marginTop: '8px', display: 'flex', gap: '8px', alignItems: 'center' } },
                        React.createElement("span", { style: {
                                padding: '2px 10px',
                                borderRadius: '12px',
                                background: `${elemColor}80`,
                                fontSize: '13px',
                                fontWeight: 'bold'
                            } }, data.element),
                        React.createElement("span", { style: {
                                padding: '2px 10px',
                                borderRadius: '12px',
                                background: 'rgba(255,255,255,0.15)',
                                fontSize: '13px'
                            } },
                            WEAPON_ICONS[data.weaponType] ?? '',
                            " ",
                            data.weaponType)))),
            React.createElement("div", { style: contStyle() },
                React.createElement("div", { style: contTitleStyle() },
                    React.createElement("span", { style: { fontFamily: FONT_NZBZ, fontSize: '16px' } }, MODE_LABELS[data.mode])),
                React.createElement("div", { style: { padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px' } },
                    data.mode === 'wiki' && (React.createElement(React.Fragment, null,
                        React.createElement(InfoRow, { label: '\u5143\u7D20', value: data.element }),
                        React.createElement(InfoRow, { label: '\u7A00\u6709\u5EA6', value: `${'★'.repeat(data.rarity)}` }),
                        React.createElement(InfoRow, { label: '\u6B66\u5668\u7C7B\u578B', value: data.weaponType }))),
                    data.mode === 'talent' && React.createElement(TalentSection, { element: data.element }),
                    data.mode === 'cons' && React.createElement(ConsSection, null))),
            React.createElement("div", { style: { position: 'relative', textAlign: 'right', padding: '8px 20px', fontSize: '12px', opacity: 0.4 } }, "Miao By ALemonJS"))));
}

export { CharWikiCard as default };
