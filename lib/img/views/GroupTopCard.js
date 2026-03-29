import { scoreCharacterArtifacts } from '../../model/miao/artisMark.js';
import React from 'react';
import HTML from './HTML.js';
import { ELEMENT_COLORS, STAR_COLORS, elemBgUrl, FONT_FAMILY, FONT_NZBZ, contStyle, contTitleStyle, formatDateZh } from './shared.js';
import fileUrl from '../../assets/common/crown.png.js';

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
                width: '550px',
                fontFamily: FONT_FAMILY,
                fontSize: '16px',
                color: '#1e1f20',
                backgroundImage: `url(${elemBgUrl(avatar.element)})`,
                backgroundSize: '100% auto',
                backgroundPosition: 'left top'
            } },
            React.createElement("div", { style: {
                    width: '550px',
                    padding: '20px 15px 10px 15px'
                } },
                React.createElement("div", { style: { borderRadius: '15px', padding: '10px 20px', color: '#fff', marginTop: '10px', display: 'flex', alignItems: 'center', gap: '10px' } },
                    React.createElement("img", { src: fileUrl, style: { width: '28px', height: '28px' } }),
                    React.createElement("div", null,
                        React.createElement("div", { style: {
                                fontFamily: FONT_NZBZ,
                                fontSize: '30px',
                                textShadow: '0 0 1px #000, 1px 1px 3px rgba(0,0,0,0.9)'
                            } },
                            "\u7FA4\u5185\u6700\u5F3A",
                            avatar.name),
                        React.createElement("div", { style: { fontSize: '14px', textShadow: '0 0 1px #000, 1px 1px 3px rgba(0,0,0,0.9)' } },
                            typeLabel,
                            "\u6392\u540D\u7B2C 1 \u00B7 UID: ",
                            uid))),
                React.createElement("div", { style: contStyle() },
                    React.createElement("div", { style: contTitleStyle({ display: 'flex', alignItems: 'center', gap: '10px' }) },
                        React.createElement("div", { style: {
                                width: '52px',
                                height: '52px',
                                borderRadius: '50%',
                                border: `2px solid ${starColor}`,
                                boxShadow: '1px 1px 3px 0 #000',
                                overflow: 'hidden',
                                flexShrink: 0
                            } },
                            React.createElement("img", { src: avatar.icon, style: { width: '100%', height: '100%' } })),
                        React.createElement("div", null,
                            React.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: '6px' } },
                                React.createElement("span", { style: { fontSize: '18px', fontWeight: 'bold' } }, avatar.name),
                                React.createElement("span", { style: { fontSize: '12px', background: elemColor, color: '#fff', borderRadius: '3px', padding: '1px 6px' } }, avatar.element)),
                            React.createElement("div", { style: { fontSize: '13px', color: '#fff', fontWeight: 'normal', marginTop: '2px' } },
                                "Lv.",
                                avatar.level,
                                " \u00B7 ",
                                '★'.repeat(avatar.rarity),
                                " \u00B7 ",
                                consLabel,
                                ": ",
                                avatar.cons))),
                    React.createElement("div", { style: { display: 'flex', gap: '10px', padding: '12px 15px' } },
                        React.createElement("div", { style: { flex: 1, background: 'rgba(0,0,0,0.3)', borderRadius: '6px', padding: '10px', textAlign: 'center', color: '#fff' } },
                            React.createElement("div", { style: { fontSize: '12px', color: '#d3bc8e' } },
                                game === 'sr' ? '遗器' : '圣遗物',
                                "\u8BC4\u5206"),
                            React.createElement("div", { style: { fontSize: '22px', fontWeight: 'bold', color: artScore.grade.color, marginTop: '4px' } }, artScore.totalMark),
                            React.createElement("div", { style: { fontSize: '12px', fontWeight: 'bold', color: artScore.grade.color } }, artScore.grade.grade)),
                        React.createElement("div", { style: { flex: 1, background: 'rgba(0,0,0,0.3)', borderRadius: '6px', padding: '10px', textAlign: 'center', color: '#fff' } },
                            React.createElement("div", { style: { fontSize: '12px', color: '#d3bc8e' } }, "\u53CC\u7206\u5408\u8BA1"),
                            React.createElement("div", { style: { fontSize: '22px', fontWeight: 'bold', marginTop: '4px' } },
                                Math.round((critRate + critDmg) * 10) / 10,
                                "%"),
                            React.createElement("div", { style: { fontSize: '12px', color: '#aaa' } },
                                critRate,
                                "% + ",
                                critDmg,
                                "%")),
                        avatar.weapon && (React.createElement("div", { style: { flex: 1, background: 'rgba(0,0,0,0.3)', borderRadius: '6px', padding: '10px', textAlign: 'center', color: '#fff' } },
                            React.createElement("div", { style: { fontSize: '12px', color: '#d3bc8e' } }, game === 'sr' ? '光锥' : '武器'),
                            React.createElement("div", { style: { fontSize: '13px', fontWeight: 'bold', marginTop: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, avatar.weapon.name),
                            React.createElement("div", { style: { fontSize: '12px', color: '#aaa' } },
                                "Lv.",
                                avatar.weapon.level,
                                " \u7CBE",
                                avatar.weapon.affix)))),
                    avatar.talent && (React.createElement("div", { style: { display: 'flex', gap: '8px', justifyContent: 'center', padding: '0 15px 12px' } }, [
                        { label: game === 'sr' ? '普攻' : '普攻', value: avatar.talent.a },
                        { label: game === 'sr' ? '战技' : '战技', value: avatar.talent.e },
                        { label: game === 'sr' ? '终结技' : '爆发', value: avatar.talent.q }
                    ].map(t => (React.createElement("div", { key: t.label, style: {
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '6px',
                            padding: '6px 14px',
                            textAlign: 'center',
                            minWidth: '60px',
                            color: '#fff'
                        } },
                        React.createElement("div", { style: { fontSize: '11px', color: '#d3bc8e' } }, t.label),
                        React.createElement("div", { style: { fontSize: '18px', fontWeight: 'bold', color: t.value >= 10 ? '#ffd700' : '#fff', marginTop: '2px' } }, t.value))))))),
                React.createElement("div", { style: {
                        display: 'flex',
                        background: 'rgba(0,0,0,0.4)',
                        width: '100%',
                        padding: '10px 15px',
                        fontSize: '12px',
                        color: '#fff',
                        borderRadius: '0 0 10px 10px',
                        margin: '5px 10px'
                    } },
                    React.createElement("span", { style: { width: '50%' } },
                        "\u6570\u636E\u6765\u6E90: ",
                        game === 'sr' ? 'Mihomo' : 'Enka Network'),
                    React.createElement("span", { style: { width: '50%', textAlign: 'right' } }, formatDateZh())),
                React.createElement("div", { style: { fontSize: '14px', textAlign: 'center', color: '#fff', textShadow: '1px 1px 1px #000', margin: '10px 0' } }, "Miao By ALemonJS")))));
}

export { GroupTopCard as default };
