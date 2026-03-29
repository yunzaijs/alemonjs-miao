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
const MATERIAL_CATEGORIES = [
    { label: '角色突破素材', icon: '💎', items: ['角色突破宝石', '区域特产', 'Boss掉落素材', '普通怪物掉落'] },
    { label: '天赋培养素材', icon: '📚', items: ['天赋培养书', '周本Boss素材', '普通怪物掉落'] },
    { label: '武器突破素材', icon: '⚔️', items: ['武器突破材料', '精英怪物掉落', '普通怪物掉落'] }
];
function StarRow({ rarity }) {
    const color = RARITY_COLORS[rarity] ?? '#888';
    return (React.createElement("div", { style: { display: 'flex', gap: '2px', marginTop: '4px' } }, Array.from({ length: rarity }).map((_, i) => (React.createElement("span", { key: i, style: { fontSize: '16px', color, textShadow: `0 0 4px ${color}` } }, "\u2605")))));
}
function CharMaterialCard({ data }) {
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
            React.createElement("div", { style: { position: 'relative', padding: '20px', display: 'flex', gap: '14px', alignItems: 'flex-start' } },
                React.createElement("div", { style: {
                        width: '100px',
                        height: '100px',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        border: `3px solid ${elemColor}`,
                        boxShadow: `0 0 10px ${elemColor}40`,
                        flexShrink: 0,
                        background: 'rgba(0,0,0,0.3)'
                    } }, data.faceImg ? (React.createElement("img", { src: data.faceImg, style: { width: '100%', height: '100%', objectFit: 'cover' } })) : (React.createElement("div", { style: { width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', opacity: 0.3 } }, "?"))),
                React.createElement("div", { style: { flex: 1 } },
                    React.createElement("div", { style: { fontFamily: FONT_NZBZ, fontSize: '26px', color: '#d3bc8e' } }, data.name),
                    React.createElement(StarRow, { rarity: data.rarity }),
                    React.createElement("div", { style: { marginTop: '6px', display: 'flex', gap: '6px' } },
                        React.createElement("span", { style: { padding: '2px 8px', borderRadius: '10px', background: `${elemColor}80`, fontSize: '12px', fontWeight: 'bold' } }, data.element),
                        React.createElement("span", { style: { padding: '2px 8px', borderRadius: '10px', background: 'rgba(255,255,255,0.15)', fontSize: '12px' } },
                            WEAPON_ICONS[data.weaponType] ?? '',
                            " ",
                            data.weaponType)))),
            MATERIAL_CATEGORIES.map((cat, ci) => (React.createElement("div", { key: ci, style: contStyle() },
                React.createElement("div", { style: contTitleStyle() },
                    React.createElement("span", { style: { fontFamily: FONT_NZBZ, fontSize: '15px' } },
                        cat.icon,
                        " ",
                        cat.label)),
                React.createElement("div", { style: { padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: '4px' } }, cat.items.map((item, i) => (React.createElement("div", { key: i, style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '6px 10px',
                        background: 'rgba(0,0,0,0.15)',
                        borderRadius: '6px'
                    } },
                    React.createElement("div", { style: {
                            width: '36px',
                            height: '36px',
                            borderRadius: '6px',
                            background: 'rgba(0,0,0,0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '16px',
                            flexShrink: 0
                        } }, "\uD83D\uDCE6"),
                    React.createElement("div", { style: { flex: 1 } },
                        React.createElement("div", { style: { fontSize: '13px', fontWeight: 'bold' } }, item),
                        React.createElement("div", { style: { fontSize: '11px', opacity: 0.4, marginTop: '1px' } }, "\u8BE6\u7EC6\u6570\u636E\u6536\u5F55\u4E2D"))))))))),
            React.createElement("div", { style: { position: 'relative', textAlign: 'right', padding: '8px 20px', fontSize: '12px', opacity: 0.4 } }, "Miao By ALemonJS"))));
}

export { CharMaterialCard as default };
