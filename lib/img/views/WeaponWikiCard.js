import React from 'react';
import HTML from './HTML.js';
import { RARITY_COLORS, elemBgUrl, FONT_FAMILY, FONT_NZBZ, contStyle, contTitleStyle } from './shared.js';

const WEAPON_TYPE_ICONS = {
    单手剑: '🗡️',
    双手剑: '⚔️',
    长柄武器: '🔱',
    弓: '🏹',
    法器: '📖',
    光锥: '💿'
};
const BASE_STAT_LABELS = [
    { label: '基础攻击力', placeholder: '-' },
    { label: '副属性', placeholder: '-' },
    { label: '最高等级', placeholder: 'Lv.90' }
];
function StarRow({ rarity }) {
    const color = RARITY_COLORS[rarity] ?? '#888';
    return (React.createElement("div", { style: { display: 'flex', gap: '2px', marginTop: '4px' } }, Array.from({ length: rarity }).map((_, i) => (React.createElement("span", { key: i, style: { fontSize: '20px', color, textShadow: `0 0 4px ${color}` } }, "\u2605")))));
}
function WeaponWikiCard({ data }) {
    const rarityColor = RARITY_COLORS[data.rarity] ?? '#ccc';
    return (React.createElement(HTML, { style: { width: '500px' } },
        React.createElement("div", { style: {
                fontFamily: FONT_FAMILY,
                color: '#fff',
                backgroundImage: `url(${elemBgUrl()})`,
                backgroundSize: 'cover',
                backgroundPosition: 'left top',
                position: 'relative',
                paddingBottom: '10px'
            } },
            React.createElement("div", { style: { position: 'relative', padding: '24px 20px 12px' } },
                React.createElement("div", { style: { fontFamily: FONT_NZBZ, fontSize: '30px', color: '#d3bc8e' } }, data.name),
                React.createElement(StarRow, { rarity: data.rarity }),
                React.createElement("div", { style: { marginTop: '8px', display: 'flex', gap: '8px' } },
                    React.createElement("span", { style: {
                            padding: '3px 12px',
                            borderRadius: '12px',
                            background: `${rarityColor}60`,
                            fontSize: '13px',
                            fontWeight: 'bold'
                        } },
                        WEAPON_TYPE_ICONS[data.weaponType] ?? '🔧',
                        " ",
                        data.weaponType),
                    React.createElement("span", { style: {
                            padding: '3px 12px',
                            borderRadius: '12px',
                            background: 'rgba(255,255,255,0.1)',
                            fontSize: '13px',
                            color: rarityColor
                        } }, '★'.repeat(data.rarity)))),
            React.createElement("div", { style: contStyle() },
                React.createElement("div", { style: contTitleStyle() },
                    React.createElement("span", { style: { fontFamily: FONT_NZBZ, fontSize: '15px' } }, "\u57FA\u7840\u5C5E\u6027")),
                React.createElement("div", { style: { padding: '12px', display: 'flex', flexDirection: 'column', gap: '5px' } }, BASE_STAT_LABELS.map((s, i) => (React.createElement("div", { key: i, style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '7px 14px',
                        background: 'rgba(0,0,0,0.15)',
                        borderRadius: '6px'
                    } },
                    React.createElement("span", { style: { fontSize: '13px', opacity: 0.7 } }, s.label),
                    React.createElement("span", { style: { fontSize: '13px', fontWeight: 'bold' } }, s.placeholder)))))),
            React.createElement("div", { style: contStyle() },
                React.createElement("div", { style: contTitleStyle() },
                    React.createElement("span", { style: { fontFamily: FONT_NZBZ, fontSize: '15px' } }, "\u6B66\u5668\u6280\u80FD")),
                React.createElement("div", { style: { padding: '14px 16px' } },
                    React.createElement("div", { style: {
                            padding: '12px',
                            background: 'rgba(0,0,0,0.15)',
                            borderRadius: '8px',
                            fontSize: '13px',
                            lineHeight: '1.6',
                            opacity: 0.6,
                            textAlign: 'center'
                        } }, "\u6B66\u5668\u8BE6\u7EC6\u6570\u636E\u6536\u5F55\u4E2D\uFF0C\u656C\u8BF7\u671F\u5F85"))),
            React.createElement("div", { style: contStyle() },
                React.createElement("div", { style: contTitleStyle() },
                    React.createElement("span", { style: { fontFamily: FONT_NZBZ, fontSize: '15px' } }, "\u7A81\u7834\u6750\u6599")),
                React.createElement("div", { style: { padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: '4px' } }, ['武器突破材料', '精英怪物掉落', '普通怪物掉落'].map((mat, i) => (React.createElement("div", { key: i, style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '6px 10px',
                        background: 'rgba(0,0,0,0.15)',
                        borderRadius: '6px'
                    } },
                    React.createElement("div", { style: {
                            width: '32px',
                            height: '32px',
                            borderRadius: '6px',
                            background: 'rgba(0,0,0,0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '14px',
                            flexShrink: 0
                        } }, "\uD83D\uDCE6"),
                    React.createElement("div", null,
                        React.createElement("div", { style: { fontSize: '13px', fontWeight: 'bold' } }, mat),
                        React.createElement("div", { style: { fontSize: '11px', opacity: 0.4 } }, "\u8BE6\u7EC6\u6570\u636E\u6536\u5F55\u4E2D"))))))),
            React.createElement("div", { style: { position: 'relative', textAlign: 'right', padding: '8px 20px', fontSize: '12px', opacity: 0.4 } }, "Miao By ALemonJS"))));
}

export { WeaponWikiCard as default };
