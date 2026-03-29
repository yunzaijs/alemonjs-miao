import React from 'react';
import HTML from './HTML.js';
import { FONT_FAMILY, FONT_NZBZ, contStyle, STAR_COLORS, RARITY_COLORS } from './shared.js';

function WeaponCard({ data }) {
    const { uid, avatars = [], filterText } = data;
    let list = avatars.filter(a => a.weapon && a.weapon.rarity > 1);
    let filterRarity = 0;
    if (/五星|5星/.test(filterText)) {
        filterRarity = 5;
    }
    else if (/四星|4星/.test(filterText)) {
        filterRarity = 4;
    }
    if (filterRarity > 0) {
        list = list.filter(a => a.weapon.rarity === filterRarity);
    }
    list.sort((a, b) => {
        const diff = b.weapon.rarity - a.weapon.rarity;
        if (diff !== 0) {
            return diff;
        }
        const lvDiff = b.weapon.level - a.weapon.level;
        if (lvDiff !== 0) {
            return lvDiff;
        }
        return b.weapon.affix_level - a.weapon.affix_level;
    });
    const count5 = list.filter(a => a.weapon.rarity === 5).length;
    const count4 = list.filter(a => a.weapon.rarity === 4).length;
    const countOther = list.filter(a => a.weapon.rarity <= 3).length;
    const filterLabel = filterRarity > 0 ? ` · ${filterRarity}星` : '';
    return (React.createElement(HTML, { style: { width: '600px' } },
        React.createElement("div", { style: {
                fontFamily: FONT_FAMILY,
                color: '#fff',
                backgroundColor: '#2a3860',
                position: 'relative',
                paddingBottom: '10px'
            } },
            React.createElement("div", { style: {
                    display: 'flex',
                    padding: '20px 20px 10px',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end'
                } },
                React.createElement("div", null,
                    React.createElement("div", { style: { fontFamily: FONT_NZBZ, fontSize: '36px', textShadow: '0 0 3px rgba(0,0,0,0.5)' } },
                        "\u6B66\u5668\u4E00\u89C8",
                        filterLabel),
                    React.createElement("div", { style: { fontSize: '14px', opacity: 0.6, marginTop: '2px' } },
                        "\u4E94\u661F",
                        count5,
                        " \u00B7 \u56DB\u661F",
                        count4,
                        countOther > 0 ? ` · 其他${countOther}` : '')),
                React.createElement("div", { style: { fontSize: '14px', opacity: 0.5 } },
                    "UID:",
                    uid)),
            React.createElement("div", { style: contStyle() }, list.length === 0 ? (React.createElement("div", { style: { textAlign: 'center', padding: '30px 0', color: '#999', fontSize: '14px' } }, "\u6682\u65E0\u6B66\u5668\u6570\u636E")) : (React.createElement("div", { style: { padding: '8px 10px' } }, list.map((a, i) => {
                const w = a.weapon;
                const starColor = STAR_COLORS[w.rarity] ?? '#808080';
                const rarityColor = RARITY_COLORS[w.rarity] ?? '#ccc';
                return (React.createElement("div", { key: i, style: {
                        display: 'flex',
                        alignItems: 'center',
                        padding: '6px 4px',
                        borderBottom: i < list.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                        gap: '8px'
                    } },
                    React.createElement("div", { style: {
                            width: '42px',
                            height: '42px',
                            borderRadius: '6px',
                            border: `2px solid ${starColor}`,
                            overflow: 'hidden',
                            flexShrink: 0,
                            background: 'rgba(0,0,0,0.3)'
                        } },
                        React.createElement("img", { src: w.icon, style: { width: '100%', height: '100%', objectFit: 'cover' } })),
                    React.createElement("div", { style: { flex: 1, minWidth: 0 } },
                        React.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: '6px' } },
                            React.createElement("span", { style: { fontSize: '14px', fontWeight: 'bold', color: rarityColor } }, w.name),
                            React.createElement("span", { style: {
                                    fontSize: '11px',
                                    padding: '1px 5px',
                                    borderRadius: '3px',
                                    background: w.affix_level >= 4 ? '#ff5722' : '#62a8ea',
                                    color: '#fff'
                                } },
                                "\u7CBE",
                                w.affix_level)),
                        React.createElement("div", { style: { fontSize: '12px', color: '#aaa', marginTop: '2px' } },
                            "Lv.",
                            w.level)),
                    React.createElement("div", { style: { textAlign: 'right', flexShrink: 0 } },
                        React.createElement("div", { style: { fontSize: '12px', color: '#ccc' } },
                            "\u2192 ",
                            a.name))));
            })))),
            React.createElement("div", { style: {
                    textAlign: 'right',
                    padding: '8px 20px',
                    fontSize: '12px',
                    opacity: 0.4
                } }, "Miao By ALemonJS"))));
}

export { WeaponCard as default };
