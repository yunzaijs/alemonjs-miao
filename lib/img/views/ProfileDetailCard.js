import React from 'react';
import HTML from './HTML.js';

const ELEMENT_COLORS = {
    火: '#ef5350',
    水: '#42a5f5',
    风: '#66bb6a',
    雷: '#ab47bc',
    草: '#8bc34a',
    冰: '#29b6f6',
    岩: '#ffa726',
    物理: '#9e9e9e',
    量子: '#7e57c2',
    虚数: '#fdd835'
};
const STAR_COLOR = {
    5: '#ce8d54',
    4: '#a0a0e8',
    3: '#6ba8e8'
};
const CONS_COLORS = {
    0: '#8e8e8e',
    1: '#5d9e5e',
    2: '#5c85c1',
    3: '#7267b0',
    4: '#a85fa5',
    5: '#c2733a',
    6: '#d4a574'
};
function AttrRow({ stat, idx }) {
    const bgColor = idx % 2 === 0 ? 'rgba(0,0,0,0.2)' : 'rgba(50,50,50,0.4)';
    return (React.createElement("div", { style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '7px 14px',
            background: bgColor,
            borderRadius: '4px',
            marginBottom: '2px'
        } },
        React.createElement("span", { style: { fontSize: '13px', color: '#ddd' } }, stat.name),
        React.createElement("div", { style: { display: 'flex', alignItems: 'baseline', gap: '4px' } },
            React.createElement("span", { style: { fontSize: '14px', fontWeight: 'bold', color: '#fff' } }, stat.value),
            stat.base && stat.plus && (React.createElement("span", { style: { fontSize: '11px', color: '#90e800' } },
                "(",
                stat.base,
                "+",
                stat.plus,
                ")")))));
}
function TalentRow({ talent, game }) {
    const labels = game === 'sr' ? ['普攻', '战技', '终结技'] : ['普攻', '战技', '爆发'];
    const items = [
        { label: labels[0], level: talent.a, key: 'a' },
        { label: labels[1], level: talent.e, key: 'e' },
        { label: labels[2], level: talent.q, key: 'q' }
    ];
    return (React.createElement("div", { style: {
            display: 'flex',
            gap: '10px',
            justifyContent: 'center'
        } }, items.map(t => {
        const isCrown = t.level >= 10;
        return (React.createElement("div", { key: t.key, style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: 'rgba(0,0,0,0.3)',
                borderRadius: '8px',
                padding: '8px 16px',
                minWidth: '70px'
            } },
            React.createElement("span", { style: { fontSize: '11px', color: '#aaa' } }, t.label),
            React.createElement("span", { style: {
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: isCrown ? '#ffd700' : '#fff',
                    marginTop: '2px'
                } }, t.level)));
    })));
}
function ConsRow({ cons }) {
    return (React.createElement("div", { style: { display: 'flex', gap: '6px', justifyContent: 'center' } }, [1, 2, 3, 4, 5, 6].map(i => {
        const lit = i <= cons;
        return (React.createElement("div", { key: i, style: {
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: lit ? (CONS_COLORS[cons] ?? '#d4a574') : 'rgba(80,80,80,0.5)',
                border: `2px solid ${lit ? 'rgba(255,255,255,0.4)' : 'rgba(100,100,100,0.3)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold',
                color: lit ? '#fff' : '#555'
            } }, i));
    })));
}
function WeaponSection({ weapon }) {
    const starColor = STAR_COLOR[weapon.rarity] ?? STAR_COLOR[4];
    return (React.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: '12px' } },
        React.createElement("div", { style: {
                width: '56px',
                height: '56px',
                borderRadius: '10px',
                border: `2px solid ${starColor}`,
                overflow: 'hidden',
                flexShrink: 0,
                background: 'rgba(0,0,0,0.3)'
            } },
            React.createElement("img", { src: weapon.icon, style: { width: '100%', height: '100%' } })),
        React.createElement("div", { style: { display: 'flex', flexDirection: 'column' } },
            React.createElement("span", { style: { fontSize: '14px', fontWeight: 'bold', color: '#fff' } }, weapon.name),
            React.createElement("div", { style: { display: 'flex', gap: '8px', marginTop: '4px', alignItems: 'center' } },
                React.createElement("span", { style: { fontSize: '12px', color: '#ccc' } },
                    "Lv.",
                    weapon.level),
                React.createElement("span", { style: {
                        fontSize: '11px',
                        background: '#f0a030',
                        color: '#fff',
                        borderRadius: '3px',
                        padding: '0 5px'
                    } },
                    "\u7CBE",
                    weapon.affix),
                React.createElement("span", { style: { fontSize: '12px', color: starColor } }, '★'.repeat(weapon.rarity))))));
}
function ArtifactItem({ art }) {
    const starColor = STAR_COLOR[art.rarity] ?? STAR_COLOR[5];
    return (React.createElement("div", { style: {
            display: 'flex',
            gap: '10px',
            padding: '8px 0',
            borderBottom: '1px solid rgba(255,255,255,0.06)'
        } },
        React.createElement("div", { style: {
                width: '44px',
                height: '44px',
                borderRadius: '8px',
                border: `1.5px solid ${starColor}`,
                overflow: 'hidden',
                flexShrink: 0,
                background: 'rgba(0,0,0,0.25)'
            } },
            React.createElement("img", { src: art.icon, style: { width: '100%', height: '100%' } })),
        React.createElement("div", { style: { flex: 1, minWidth: 0 } },
            React.createElement("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                React.createElement("span", { style: {
                        fontSize: '12px',
                        color: '#ddd',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: '120px'
                    } }, art.name),
                React.createElement("span", { style: { fontSize: '11px', color: '#888' } },
                    "+",
                    art.level)),
            React.createElement("div", { style: { fontSize: '12px', color: '#e8d5b0', marginTop: '2px' } },
                art.mainName,
                " ",
                art.mainValue),
            React.createElement("div", { style: {
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '4px 10px',
                    marginTop: '3px'
                } }, art.subStats.map((sub, i) => (React.createElement("span", { key: i, style: { fontSize: '10px', color: '#aaa' } },
                sub.name,
                "+",
                sub.value)))))));
}
function SectionTitle({ title }) {
    return (React.createElement("div", { style: {
            fontSize: '13px',
            fontWeight: 'bold',
            color: '#e8d5b0',
            marginBottom: '8px',
            paddingBottom: '4px',
            borderBottom: '1px solid rgba(232,213,176,0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
        } },
        React.createElement("span", { style: {
                width: '3px',
                height: '14px',
                background: '#e8d5b0',
                borderRadius: '2px'
            } }),
        title));
}
function ProfileDetailCard({ data }) {
    const { avatar, game, uid } = data;
    const elemColor = ELEMENT_COLORS[avatar.element] ?? '#888';
    const starColor = STAR_COLOR[avatar.rarity] ?? STAR_COLOR[5];
    const consLabel = game === 'sr' ? '星魂' : '命座';
    return (React.createElement(HTML, { style: { width: '600px' } },
        React.createElement("div", { style: {
                padding: '0',
                background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                fontFamily: '"tttgbnumber", "PingFang SC", system-ui, sans-serif',
                fontSize: '14px',
                color: '#eee',
                minHeight: '400px'
            } },
            React.createElement("div", { style: {
                    padding: '20px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    borderBottom: '1px solid rgba(255,255,255,0.08)'
                } },
                React.createElement("div", { style: {
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        border: `3px solid ${starColor}`,
                        boxShadow: `0 0 12px ${starColor}44`,
                        overflow: 'hidden',
                        flexShrink: 0
                    } },
                    React.createElement("img", { src: avatar.icon, style: { width: '100%', height: '100%' } })),
                React.createElement("div", { style: { display: 'flex', flexDirection: 'column', flex: 1 } },
                    React.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: '10px' } },
                        React.createElement("span", { style: {
                                fontSize: '24px',
                                fontWeight: 'bold',
                                color: '#fff',
                                textShadow: '0 0 8px rgba(255,255,255,0.2)'
                            } }, avatar.name),
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
                            alignItems: 'center',
                            gap: '12px',
                            marginTop: '6px',
                            fontSize: '12px',
                            color: '#999'
                        } },
                        React.createElement("span", null,
                            "UID: ",
                            uid),
                        React.createElement("span", { style: { color: starColor } }, '★'.repeat(avatar.rarity)),
                        React.createElement("span", null,
                            "Lv.",
                            avatar.level),
                        React.createElement("span", null,
                            consLabel,
                            ": ",
                            avatar.cons),
                        game === 'gs' && React.createElement("span", null,
                            "\u597D\u611F: ",
                            avatar.fetter)))),
            avatar.talent && (React.createElement("div", { style: { padding: '14px 24px' } },
                React.createElement(SectionTitle, { title: game === 'sr' ? '行迹' : '天赋' }),
                React.createElement(TalentRow, { talent: avatar.talent, game: game }))),
            React.createElement("div", { style: { padding: '4px 24px 14px' } },
                React.createElement(SectionTitle, { title: consLabel }),
                React.createElement(ConsRow, { cons: avatar.cons })),
            avatar.stats && avatar.stats.length > 0 && (React.createElement("div", { style: { padding: '0 24px 14px' } },
                React.createElement(SectionTitle, { title: '\u5C5E\u6027\u9762\u677F' }),
                React.createElement("div", null, avatar.stats.map((stat, i) => (React.createElement(AttrRow, { key: stat.key, stat: stat, idx: i })))))),
            avatar.weapon && (React.createElement("div", { style: { padding: '0 24px 14px' } },
                React.createElement(SectionTitle, { title: game === 'sr' ? '光锥' : '武器' }),
                React.createElement(WeaponSection, { weapon: avatar.weapon, game: game }))),
            avatar.artifacts && avatar.artifacts.length > 0 && (React.createElement("div", { style: { padding: '0 24px 14px' } },
                React.createElement(SectionTitle, { title: game === 'sr' ? '遗器' : '圣遗物' }),
                avatar.artifacts.map(art => (React.createElement(ArtifactItem, { key: art.pos, art: art }))))),
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
                React.createElement("span", null, new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }))))));
}

export { ProfileDetailCard as default };
