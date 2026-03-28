import React from 'react';
import HTML from './HTML.js';
import { FONT_FAMILY, DARK_BG, ELEMENT_COLORS, formatDateZh, STAR_COLORS } from './shared.js';

function StatBar({ label, value, max, color }) {
    const pct = max > 0 ? Math.round((value / max) * 100) : 0;
    return (React.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' } },
        React.createElement("span", { style: { fontSize: '12px', color: '#aaa', width: '50px', textAlign: 'right' } }, label),
        React.createElement("div", { style: {
                flex: 1,
                height: '16px',
                background: 'rgba(0,0,0,0.3)',
                borderRadius: '3px',
                overflow: 'hidden',
                position: 'relative'
            } },
            React.createElement("div", { style: {
                    width: `${pct}%`,
                    height: '100%',
                    background: `linear-gradient(90deg, ${color}cc, ${color})`,
                    borderRadius: '3px',
                    minWidth: value > 0 ? '2px' : '0',
                    boxShadow: `0 0 6px ${color}44`
                } }),
            React.createElement("span", { style: {
                    position: 'absolute',
                    right: '4px',
                    top: '0',
                    lineHeight: '16px',
                    fontSize: '10px',
                    color: '#fff',
                    fontWeight: 'bold'
                } }, value))));
}
function CharRow({ avatar, game }) {
    const border = STAR_COLORS[avatar.rarity] ?? STAR_COLORS[4];
    const elemColor = ELEMENT_COLORS[avatar.element] ?? '#888';
    const consLabel = game === 'sr' ? '星魂' : '命座';
    const weaponLabel = game === 'sr' ? '光锥' : '武器';
    return (React.createElement("div", { style: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '6px 14px',
            background: 'rgba(0,0,0,0.15)',
            borderRadius: '6px',
            marginBottom: '4px'
        } },
        React.createElement("div", { style: {
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: `2px solid ${border}`,
                overflow: 'hidden',
                flexShrink: 0
            } },
            React.createElement("img", { src: avatar.icon, style: { width: '100%', height: '100%' } })),
        React.createElement("div", { style: { width: '60px', flexShrink: 0 } },
            React.createElement("div", { style: {
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: '#fff',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                } }, avatar.abbr || avatar.name)),
        React.createElement("span", { style: {
                fontSize: '10px',
                background: elemColor,
                color: '#fff',
                borderRadius: '3px',
                padding: '1px 5px',
                flexShrink: 0
            } }, avatar.element),
        React.createElement("span", { style: { fontSize: '12px', color: '#e8d5b0', width: '45px' } },
            "Lv.",
            avatar.level),
        React.createElement("span", { style: { fontSize: '11px', color: '#ccc', width: '45px' } },
            consLabel,
            avatar.cons),
        avatar.weapon && (React.createElement("span", { style: { fontSize: '11px', color: '#aaa' } },
            weaponLabel,
            " Lv.",
            avatar.weapon.level,
            " \u7CBE",
            avatar.weapon.affix)),
        avatar.talent && (React.createElement("span", { style: { fontSize: '11px', color: '#aaa', marginLeft: 'auto' } },
            avatar.talent.a,
            "/",
            avatar.talent.e,
            "/",
            avatar.talent.q))));
}
function TrainingStatCard({ data }) {
    const { avatars, game, uid, nickname } = data;
    const total = avatars.length;
    const star5 = avatars.filter(a => a.rarity === 5).length;
    const star4 = avatars.filter(a => a.rarity === 4).length;
    const maxLevel = avatars.filter(a => a.level >= 90).length;
    const maxCons = avatars.filter(a => a.cons >= 6).length;
    const levelBuckets = [
        { label: '90', count: avatars.filter(a => a.level >= 90).length },
        { label: '80-89', count: avatars.filter(a => a.level >= 80 && a.level < 90).length },
        { label: '70-79', count: avatars.filter(a => a.level >= 70 && a.level < 80).length },
        { label: '60-69', count: avatars.filter(a => a.level >= 60 && a.level < 70).length },
        { label: '<60', count: avatars.filter(a => a.level < 60).length }
    ];
    const consBuckets = [0, 1, 2, 3, 4, 5, 6].map(c => ({
        label: `${game === 'sr' ? '星魂' : '命座'}${c}`,
        count: avatars.filter(a => a.cons === c).length
    }));
    const elemCounts = {};
    for (const av of avatars) {
        elemCounts[av.element] = (elemCounts[av.element] ?? 0) + 1;
    }
    const maxBucketVal = Math.max(...levelBuckets.map(b => b.count), 1);
    const maxConsVal = Math.max(...consBuckets.map(b => b.count), 1);
    const consLabel = game === 'sr' ? '星魂' : '命座';
    const sorted = [...avatars].sort((a, b) => {
        if (b.level !== a.level) {
            return b.level - a.level;
        }
        return b.cons - a.cons;
    });
    return (React.createElement(HTML, { style: { width: '680px' } },
        React.createElement("div", { style: {
                padding: '0',
                background: DARK_BG,
                fontFamily: FONT_FAMILY,
                fontSize: '14px',
                color: '#eee',
                minHeight: '400px'
            } },
            React.createElement("div", { style: {
                    padding: '20px 24px 14px',
                    borderBottom: '1px solid rgba(255,255,255,0.1)'
                } },
                React.createElement("div", { style: {
                        fontSize: '22px',
                        fontWeight: 'bold',
                        color: '#fff',
                        textShadow: '0 0 6px rgba(255,255,255,0.3)'
                    } },
                    "#\u7EC3\u5EA6\u7EDF\u8BA1",
                    React.createElement("span", { style: {
                            fontSize: '13px',
                            color: '#aaa',
                            fontWeight: 'normal',
                            marginLeft: '12px'
                        } },
                        nickname,
                        " \u00B7 UID:",
                        uid))),
            React.createElement("div", { style: {
                    padding: '14px 24px',
                    display: 'flex',
                    gap: '12px',
                    flexWrap: 'wrap'
                } }, [
                { label: '总角色', value: total, color: '#42a5f5' },
                { label: '五星', value: star5, color: '#ce8d54' },
                { label: '四星', value: star4, color: '#a0a0e8' },
                { label: '满级', value: maxLevel, color: '#66bb6a' },
                { label: `满${consLabel}`, value: maxCons, color: '#d4a574' }
            ].map(item => (React.createElement("div", { key: item.label, style: {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    background: 'rgba(0,0,0,0.25)',
                    borderRadius: '8px',
                    padding: '10px 16px',
                    minWidth: '70px'
                } },
                React.createElement("span", { style: { fontSize: '11px', color: '#aaa' } }, item.label),
                React.createElement("span", { style: {
                        fontSize: '22px',
                        fontWeight: 'bold',
                        color: item.color,
                        marginTop: '2px'
                    } }, item.value))))),
            React.createElement("div", { style: { padding: '0 24px 14px', display: 'flex', gap: '20px' } },
                React.createElement("div", { style: { flex: 1 } },
                    React.createElement("div", { style: {
                            fontSize: '13px',
                            fontWeight: 'bold',
                            color: '#e8d5b0',
                            marginBottom: '8px',
                            paddingBottom: '4px',
                            borderBottom: '1px solid rgba(232,213,176,0.2)'
                        } }, "\u7B49\u7EA7\u5206\u5E03"),
                    levelBuckets.map(b => (React.createElement(StatBar, { key: b.label, label: `Lv.${b.label}`, value: b.count, max: maxBucketVal, color: '#42a5f5' })))),
                React.createElement("div", { style: { flex: 1 } },
                    React.createElement("div", { style: {
                            fontSize: '13px',
                            fontWeight: 'bold',
                            color: '#e8d5b0',
                            marginBottom: '8px',
                            paddingBottom: '4px',
                            borderBottom: '1px solid rgba(232,213,176,0.2)'
                        } },
                        consLabel,
                        "\u5206\u5E03"),
                    consBuckets.map(b => (React.createElement(StatBar, { key: b.label, label: b.label, value: b.count, max: maxConsVal, color: '#ab47bc' }))))),
            React.createElement("div", { style: { padding: '0 24px 14px' } },
                React.createElement("div", { style: {
                        fontSize: '13px',
                        fontWeight: 'bold',
                        color: '#e8d5b0',
                        marginBottom: '8px',
                        paddingBottom: '4px',
                        borderBottom: '1px solid rgba(232,213,176,0.2)'
                    } }, "\u5143\u7D20\u5206\u5E03"),
                React.createElement("div", { style: { display: 'flex', gap: '8px', flexWrap: 'wrap' } }, Object.entries(elemCounts).map(([elem, count]) => (React.createElement("div", { key: elem, style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        background: 'rgba(0,0,0,0.25)',
                        borderRadius: '6px',
                        padding: '6px 12px'
                    } },
                    React.createElement("span", { style: {
                            fontSize: '12px',
                            color: ELEMENT_COLORS[elem] ?? '#888',
                            fontWeight: 'bold'
                        } }, elem),
                    React.createElement("span", { style: { fontSize: '14px', fontWeight: 'bold', color: '#fff' } }, count)))))),
            React.createElement("div", { style: { padding: '0 24px 14px' } },
                React.createElement("div", { style: {
                        fontSize: '13px',
                        fontWeight: 'bold',
                        color: '#e8d5b0',
                        marginBottom: '8px',
                        paddingBottom: '4px',
                        borderBottom: '1px solid rgba(232,213,176,0.2)'
                    } }, "\u89D2\u8272\u8BE6\u60C5"),
                sorted.map(av => (React.createElement(CharRow, { key: av.id, avatar: av, game: game })))),
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

export { TrainingStatCard as default };
