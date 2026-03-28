import { scoreCharacterArtifacts } from '../../model/miao/artisMark.js';
import React from 'react';
import HTML from './HTML.js';
import { ELEMENT_COLORS, STAR_COLORS, FONT_FAMILY, DARK_BG, formatDateZh } from './shared.js';

const TYPE_LABELS = {
    mark: '圣遗物评分',
    crit: '双爆'
};
function GroupTopCard({ data }) {
    const { avatar, game, uid, type } = data;
    const elemColor = ELEMENT_COLORS[avatar.element] ?? '#888';
    const starColor = STAR_COLORS[avatar.rarity] ?? STAR_COLORS[5];
    const artScore = scoreCharacterArtifacts(avatar);
    const typeLabel = TYPE_LABELS[type] ?? type;
    const consLabel = game === 'sr' ? '星魂' : '命座';
    let critRate = 0;
    let critDmg = 0;
    if (avatar.stats) {
        for (const stat of avatar.stats) {
            if (stat.key === 'critRate' || stat.name === '暴击率') {
                critRate = parseFloat(stat.value.replace('%', '')) || 0;
            }
            if (stat.key === 'critDmg' || stat.name === '暴击伤害') {
                critDmg = parseFloat(stat.value.replace('%', '')) || 0;
            }
        }
    }
    return (React.createElement(HTML, { style: { width: '550px' } },
        React.createElement("div", { style: {
                padding: '0',
                background: DARK_BG,
                fontFamily: FONT_FAMILY,
                fontSize: '14px',
                color: '#eee',
                minHeight: '300px'
            } },
            React.createElement("div", { style: {
                    padding: '20px 24px 14px',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    background: 'linear-gradient(135deg, rgba(255,215,0,0.15), rgba(255,215,0,0.02))'
                } },
                React.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: '10px' } },
                    React.createElement("span", { style: {
                            fontSize: '28px',
                            fontWeight: 'bold',
                            color: '#ffd700',
                            textShadow: '0 0 12px rgba(255,215,0,0.4)'
                        } }, "\uD83D\uDC51"),
                    React.createElement("div", null,
                        React.createElement("div", { style: {
                                fontSize: '20px',
                                fontWeight: 'bold',
                                color: '#fff'
                            } },
                            "\u7FA4\u5185\u6700\u5F3A",
                            avatar.name),
                        React.createElement("div", { style: {
                                fontSize: '12px',
                                color: '#aaa',
                                marginTop: '2px'
                            } },
                            typeLabel,
                            "\u6392\u540D\u7B2C 1 \u00B7 UID: ",
                            uid)))),
            React.createElement("div", { style: {
                    padding: '16px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px'
                } },
                React.createElement("div", { style: {
                        width: '72px',
                        height: '72px',
                        borderRadius: '50%',
                        border: `3px solid ${starColor}`,
                        boxShadow: `0 0 12px ${starColor}44`,
                        overflow: 'hidden',
                        flexShrink: 0
                    } },
                    React.createElement("img", { src: avatar.icon, style: { width: '100%', height: '100%' } })),
                React.createElement("div", { style: { display: 'flex', flexDirection: 'column', flex: 1 } },
                    React.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: '8px' } },
                        React.createElement("span", { style: { fontSize: '20px', fontWeight: 'bold', color: '#fff' } }, avatar.name),
                        React.createElement("span", { style: {
                                fontSize: '11px',
                                background: elemColor,
                                color: '#fff',
                                borderRadius: '4px',
                                padding: '2px 8px',
                                fontWeight: 'bold'
                            } }, avatar.element)),
                    React.createElement("div", { style: {
                            display: 'flex',
                            gap: '12px',
                            marginTop: '4px',
                            fontSize: '12px',
                            color: '#999'
                        } },
                        React.createElement("span", null,
                            "Lv.",
                            avatar.level),
                        React.createElement("span", { style: { color: starColor } }, '★'.repeat(avatar.rarity)),
                        React.createElement("span", null,
                            consLabel,
                            ": ",
                            avatar.cons)))),
            React.createElement("div", { style: {
                    padding: '0 24px 16px',
                    display: 'flex',
                    gap: '12px'
                } },
                React.createElement("div", { style: {
                        flex: 1,
                        background: 'rgba(0,0,0,0.25)',
                        borderRadius: '8px',
                        padding: '12px 16px',
                        textAlign: 'center'
                    } },
                    React.createElement("div", { style: { fontSize: '11px', color: '#aaa' } },
                        game === 'sr' ? '遗器' : '圣遗物',
                        "\u8BC4\u5206"),
                    React.createElement("div", { style: {
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: artScore.grade.color,
                            marginTop: '4px'
                        } }, artScore.totalMark),
                    React.createElement("div", { style: {
                            fontSize: '12px',
                            fontWeight: 'bold',
                            color: artScore.grade.color,
                            marginTop: '2px'
                        } }, artScore.grade.grade)),
                React.createElement("div", { style: {
                        flex: 1,
                        background: 'rgba(0,0,0,0.25)',
                        borderRadius: '8px',
                        padding: '12px 16px',
                        textAlign: 'center'
                    } },
                    React.createElement("div", { style: { fontSize: '11px', color: '#aaa' } }, "\u53CC\u7206\u5408\u8BA1"),
                    React.createElement("div", { style: {
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: '#fff',
                            marginTop: '4px'
                        } },
                        Math.round((critRate + critDmg) * 10) / 10,
                        "%"),
                    React.createElement("div", { style: { fontSize: '12px', color: '#aaa', marginTop: '2px' } },
                        critRate,
                        "% + ",
                        critDmg,
                        "%")),
                avatar.weapon && (React.createElement("div", { style: {
                        flex: 1,
                        background: 'rgba(0,0,0,0.25)',
                        borderRadius: '8px',
                        padding: '12px 16px',
                        textAlign: 'center'
                    } },
                    React.createElement("div", { style: { fontSize: '11px', color: '#aaa' } }, game === 'sr' ? '光锥' : '武器'),
                    React.createElement("div", { style: {
                            fontSize: '13px',
                            fontWeight: 'bold',
                            color: '#fff',
                            marginTop: '6px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        } }, avatar.weapon.name),
                    React.createElement("div", { style: { fontSize: '12px', color: '#aaa', marginTop: '2px' } },
                        "Lv.",
                        avatar.weapon.level,
                        " \u7CBE",
                        avatar.weapon.affix)))),
            avatar.talent && (React.createElement("div", { style: {
                    padding: '0 24px 16px',
                    display: 'flex',
                    gap: '8px',
                    justifyContent: 'center'
                } }, [
                { label: game === 'sr' ? '普攻' : '普攻', value: avatar.talent.a },
                { label: game === 'sr' ? '战技' : '战技', value: avatar.talent.e },
                { label: game === 'sr' ? '终结技' : '爆发', value: avatar.talent.q }
            ].map(t => (React.createElement("div", { key: t.label, style: {
                    background: 'rgba(0,0,0,0.2)',
                    borderRadius: '6px',
                    padding: '6px 14px',
                    textAlign: 'center',
                    minWidth: '60px'
                } },
                React.createElement("div", { style: { fontSize: '10px', color: '#aaa' } }, t.label),
                React.createElement("div", { style: {
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: t.value >= 10 ? '#ffd700' : '#fff',
                        marginTop: '2px'
                    } }, t.value)))))),
            React.createElement("div", { style: {
                    padding: '10px 24px 16px',
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '11px',
                    color: '#666'
                } },
                React.createElement("span", null,
                    "\u6570\u636E\u6765\u6E90: ",
                    game === 'sr' ? 'Mihomo' : 'Enka Network'),
                React.createElement("span", null, formatDateZh())))));
}

export { GroupTopCard as default };
