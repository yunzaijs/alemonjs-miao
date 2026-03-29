import React from 'react';
import HTML from './HTML.js';
import { FONT_FAMILY, FONT_NZBZ, contStyle, contTitleStyle, ELEMENT_COLORS, formatDateZh, STAR_COLORS, fetterStyle } from './shared.js';
import fileUrl from '../../assets/common/bg-01.jpg.js';
import fileUrl$1 from '../../assets/common/main-01.png.js';

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
function CharRow({ avatar, game, idx }) {
    const border = STAR_COLORS[avatar.rarity] ?? STAR_COLORS[4];
    const consLabel = game === 'sr' ? '星魂' : '命座';
    const bgColor = idx % 2 === 0 ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.2)';
    return (React.createElement("div", { style: {
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 10px',
            background: bgColor,
            fontSize: '13px',
            color: '#fff'
        } },
        React.createElement("span", { style: { width: '22px', textAlign: 'center', color: border, fontWeight: 'bold', fontSize: '12px' } }, idx + 1),
        React.createElement("div", { style: {
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                border: `2px solid ${border}`,
                overflow: 'hidden',
                flexShrink: 0
            } },
            React.createElement("img", { src: avatar.icon, style: { width: '100%', height: '100%' } })),
        React.createElement("span", { style: { width: '65px', flexShrink: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, avatar.abbr || avatar.name),
        React.createElement("span", { style: { width: '42px', color: '#e8d5b0' } },
            "Lv.",
            avatar.level),
        React.createElement("span", { style: { width: '35px', fontSize: '12px' } },
            consLabel,
            avatar.cons),
        avatar.fetter !== undefined && React.createElement("div", { style: fetterStyle(avatar.fetter, 20) }),
        avatar.weapon && (React.createElement("span", { style: { fontSize: '12px', color: '#ccc', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } },
            avatar.weapon.name,
            " Lv.",
            avatar.weapon.level,
            " \u7CBE",
            avatar.weapon.affix)),
        avatar.talent && (React.createElement("span", { style: { fontSize: '12px', color: '#aaa', flexShrink: 0 } },
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
                width: '680px',
                fontFamily: FONT_FAMILY,
                fontSize: '16px',
                color: '#1e1f20',
                backgroundImage: `url(${fileUrl})`,
                backgroundSize: '100% auto',
                backgroundPosition: 'left center'
            } },
            React.createElement("div", { style: {
                    width: '680px',
                    padding: '20px 15px 10px 15px',
                    backgroundImage: `url(${fileUrl$1})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center -25px'
                } },
                React.createElement("div", { style: { borderRadius: '15px', padding: '10px 20px', color: '#fff', marginTop: '10px' } },
                    React.createElement("div", { style: {
                            fontFamily: FONT_NZBZ,
                            fontSize: '36px',
                            textShadow: '0 0 1px #000, 1px 1px 3px rgba(0,0,0,0.9)'
                        } },
                        "#\u7EC3\u5EA6\u7EDF\u8BA1",
                        React.createElement("span", { style: {
                                display: 'inline-block',
                                marginLeft: '10px',
                                fontSize: '16px',
                                fontFamily: FONT_FAMILY,
                                textShadow: '0 0 1px #000, 1px 1px 3px rgba(0,0,0,0.9)'
                            } },
                            nickname,
                            " \u00B7 UID:",
                            uid))),
                React.createElement("div", { style: contStyle() },
                    React.createElement("div", { style: contTitleStyle() }, "\u6982\u89C8"),
                    React.createElement("div", { style: { display: 'flex', padding: '12px 15px', gap: '10px', flexWrap: 'wrap' } }, [
                        { label: '总角色', value: total, color: '#42a5f5' },
                        { label: '五星', value: star5, color: '#ce8d54' },
                        { label: '四星', value: star4, color: '#a0a0e8' },
                        { label: '满级', value: maxLevel, color: '#66bb6a' },
                        { label: `满${consLabel}`, value: maxCons, color: '#d4a574' }
                    ].map(item => (React.createElement("div", { key: item.label, style: {
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '6px',
                            padding: '8px 14px',
                            minWidth: '65px'
                        } },
                        React.createElement("span", { style: { fontSize: '12px', color: '#d3bc8e' } }, item.label),
                        React.createElement("span", { style: { fontSize: '22px', fontWeight: 'bold', color: item.color, marginTop: '2px' } }, item.value)))))),
                React.createElement("div", { style: { display: 'flex', gap: '10px', padding: '0 0 5px' } },
                    React.createElement("div", { style: contStyle({ flex: 1 }) },
                        React.createElement("div", { style: contTitleStyle() }, "\u7B49\u7EA7\u5206\u5E03"),
                        React.createElement("div", { style: { padding: '8px 12px' } }, levelBuckets.map(b => (React.createElement(StatBar, { key: b.label, label: `Lv.${b.label}`, value: b.count, max: maxBucketVal, color: '#42a5f5' }))))),
                    React.createElement("div", { style: contStyle({ flex: 1 }) },
                        React.createElement("div", { style: contTitleStyle() },
                            consLabel,
                            "\u5206\u5E03"),
                        React.createElement("div", { style: { padding: '8px 12px' } }, consBuckets.map(b => (React.createElement(StatBar, { key: b.label, label: b.label, value: b.count, max: maxConsVal, color: '#ab47bc' })))))),
                React.createElement("div", { style: contStyle() },
                    React.createElement("div", { style: contTitleStyle() }, "\u5143\u7D20\u5206\u5E03"),
                    React.createElement("div", { style: { display: 'flex', gap: '8px', flexWrap: 'wrap', padding: '10px 15px' } }, Object.entries(elemCounts).map(([elem, count]) => (React.createElement("div", { key: elem, style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '4px',
                            padding: '5px 10px'
                        } },
                        React.createElement("span", { style: { fontSize: '13px', color: ELEMENT_COLORS[elem] ?? '#888', fontWeight: 'bold' } }, elem),
                        React.createElement("span", { style: { fontSize: '14px', fontWeight: 'bold', color: '#fff' } }, count)))))),
                React.createElement("div", { style: contStyle() },
                    React.createElement("div", { style: contTitleStyle() }, "\u89D2\u8272\u8BE6\u60C5"),
                    sorted.map((av, idx) => (React.createElement(CharRow, { key: av.id, avatar: av, game: game, idx: idx })))),
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
                React.createElement("div", { style: { fontSize: '14px', textAlign: 'center', color: '#fff', textShadow: '1px 1px 1px #000', margin: '10px 0' } }, " AlemonJS")))));
}

export { TrainingStatCard as default };
