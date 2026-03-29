import { scoreCharacterArtifacts, scoreArtifact } from '../../model/miao/artisMark.js';
import React from 'react';
import HTML from './HTML.js';
import { ELEM_BG, FONT_FAMILY, FONT_NZBZ, CONS_COLORS, contStyle, contTitleStyle, statIconStyle, STAR_COLORS } from './shared.js';
import fileUrl from '../../assets/common/crown.png.js';

function AttrRow({ stat, idx }) {
    const bgColor = idx % 2 === 0 ? 'rgba(0,0,0,0.4)' : 'rgba(50,50,50,0.4)';
    return (React.createElement("div", { style: {
            width: '300px',
            fontSize: '17px',
            listStyle: 'none',
            height: '32px',
            lineHeight: '32px',
            textShadow: '0 0 1px rgba(0,0,0,0.5)',
            display: 'flex',
            paddingLeft: '3px',
            background: bgColor,
            color: '#fff'
        } },
        React.createElement("div", { style: { width: '26px', padding: '8px 5px 0' } },
            React.createElement("i", { style: statIconStyle(stat.key) })),
        React.createElement("div", { style: { width: '75px', textShadow: '0 0 1px rgba(0,0,0,0.8), 1px 1px 3px rgba(0,0,0,0.5)' } }, stat.name),
        React.createElement("div", { style: {
                width: '100px',
                textAlign: 'right',
                fontWeight: 'normal',
                paddingRight: '10px',
                textShadow: '0 0 1px rgba(0,0,0,0.8), 1px 1px 3px rgba(0,0,0,0.5)'
            } }, stat.value),
        stat.base && stat.plus && (React.createElement("div", { style: { fontWeight: 'normal', width: '70px', textAlign: 'right', fontSize: '12px', padding: '4px 10px 0 0', background: 'rgba(0,0,0,0.2)' } },
            React.createElement("span", { style: { display: 'block', height: '13px', lineHeight: '13px', color: '#eee', fontSize: '11px' } }, stat.base),
            React.createElement("span", { style: { display: 'block', height: '13px', lineHeight: '13px', color: '#90e800', fontSize: '11px' } },
                "+",
                stat.plus)))));
}
function TalentRow({ talent, game }) {
    const labels = game === 'sr' ? ['普攻', '战技', '终结技'] : ['普攻', '战技', '爆发'];
    const items = [
        { label: labels[0], level: talent.a, key: 'a' },
        { label: labels[1], level: talent.e, key: 'e' },
        { label: labels[2], level: talent.q, key: 'q' }
    ];
    return (React.createElement("div", { style: { display: 'flex', width: '300px', margin: '0 0 10px 0' } }, items.map(t => {
        const isCrown = t.level >= 10;
        return (React.createElement("div", { key: t.key, style: { flex: 1, textAlign: 'center' } },
            React.createElement("div", { style: {
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(0,0,0,0.35)',
                    position: 'relative'
                } },
                isCrown && (React.createElement("img", { src: fileUrl, style: {
                        position: 'absolute',
                        width: '28px',
                        height: '28px',
                        top: '-2px',
                        left: '50%',
                        marginLeft: '-14px'
                    } })),
                React.createElement("span", { style: { fontSize: '11px', color: '#ccc' } }, t.label),
                React.createElement("strong", { style: {
                        background: isCrown ? '#2e353e' : '#fff',
                        color: isCrown ? '#ffdfa0' : '#000',
                        width: '34px',
                        height: '26px',
                        lineHeight: '26px',
                        fontSize: '17px',
                        textAlign: 'center',
                        borderRadius: '5px',
                        boxShadow: isCrown ? '0 0 1px 0 #d3bc8e, 1px 1px 2px 0 rgba(0,0,0,0.5)' : '0 0 5px 0 #000',
                        display: 'block',
                        marginTop: '4px'
                    } }, t.level))));
    })));
}
function ConsRow({ cons }) {
    return (React.createElement("div", { style: { display: 'flex', width: '250px' } }, [1, 2, 3, 4, 5, 6].map(i => {
        const lit = i <= cons;
        return (React.createElement("div", { key: i, style: { flex: 1 } },
            React.createElement("div", { style: {
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    margin: '0 -5px',
                    background: lit ? (CONS_COLORS[cons] ?? '#d4a574') : 'rgba(80,80,80,0.5)',
                    filter: lit ? 'none' : 'grayscale(100%)',
                    opacity: lit ? 1 : 0.4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#fff'
                } }, i)));
    })));
}
function WeaponSection({ weapon }) {
    const starColor = STAR_COLORS[weapon.rarity] ?? STAR_COLORS[4];
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
function ArtifactItem({ art, charName }) {
    const starColor = STAR_COLORS[art.rarity] ?? STAR_COLORS[5];
    const score = scoreArtifact(art, charName);
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
                React.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: '6px' } },
                    React.createElement("span", { style: {
                            fontSize: '11px',
                            fontWeight: 'bold',
                            color: score.grade.color,
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '3px',
                            padding: '0 4px'
                        } },
                        score.mark,
                        " ",
                        score.grade.grade),
                    React.createElement("span", { style: { fontSize: '11px', color: '#888' } },
                        "+",
                        art.level))),
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
function ProfileDetailCard({ data }) {
    const { avatar, game, uid } = data;
    const elemBg = ELEM_BG[avatar.element] ?? ELEM_BG.hydro;
    return (React.createElement(HTML, { style: { width: '600px' } },
        React.createElement("div", { style: {
                width: '600px',
                fontFamily: FONT_FAMILY,
                fontSize: '18px',
                color: '#1e1f20',
                backgroundImage: `url(${elemBg})`,
                backgroundSize: 'cover'
            } },
            React.createElement("div", { style: {
                    width: '600px',
                    padding: '0',
                    backgroundSize: 'cover',
                    overflow: 'hidden'
                } },
                React.createElement("div", { style: { padding: '0 10px', marginRight: '5px', position: 'relative', margin: '0 -15px 10px -10px' } },
                    React.createElement("div", { style: { position: 'relative', padding: '20px 20px 10px', color: '#fff', textAlign: 'right' } },
                        React.createElement("div", { style: {
                                fontFamily: FONT_NZBZ,
                                fontSize: '50px',
                                textShadow: '0 0 3px #000, 2px 2px 4px rgba(0,0,0,0.7)'
                            } }, avatar.name),
                        React.createElement("div", { style: {
                                marginBottom: '20px',
                                textShadow: '0 0 3px #000, 2px 2px 4px rgba(0,0,0,0.7)',
                                textAlign: 'right'
                            } },
                            "UID ",
                            uid,
                            " - Lv.",
                            avatar.level,
                            React.createElement("span", { style: {
                                    display: 'inline-block',
                                    verticalAlign: 'bottom',
                                    padding: '0 5px',
                                    borderRadius: '4px',
                                    marginLeft: '5px',
                                    background: CONS_COLORS[avatar.cons] ?? '#666',
                                    color: '#fff'
                                } },
                                avatar.cons,
                                game === 'sr' ? '魂' : '命')),
                        game === 'gs' && avatar.talent && React.createElement(TalentRow, { talent: avatar.talent, game: game }),
                        avatar.stats && avatar.stats.length > 0 && (React.createElement("div", { style: {
                                backdropFilter: 'blur(2px)',
                                background: 'rgba(0,0,0,0.2)',
                                borderRadius: '8px',
                                overflow: 'hidden'
                            } }, avatar.stats.map((stat, i) => (React.createElement(AttrRow, { key: stat.key, stat: stat, idx: i })))))),
                    React.createElement("div", { style: { position: 'relative', padding: '5px 20px' } },
                        React.createElement(ConsRow, { cons: avatar.cons }))),
                game === 'sr' && avatar.talent && (React.createElement("div", { style: contStyle({ margin: '5px 15px' }) },
                    React.createElement("div", { style: contTitleStyle() }, "\u884C\u8FF9"),
                    React.createElement("div", { style: { padding: '10px 15px' } },
                        React.createElement(TalentRow, { talent: avatar.talent, game: game })))),
                avatar.weapon && (React.createElement("div", { style: contStyle({ margin: '5px 15px' }) },
                    React.createElement("div", { style: contTitleStyle() }, game === 'sr' ? '光锥' : '武器'),
                    React.createElement("div", { style: { padding: '10px 15px' } },
                        React.createElement(WeaponSection, { weapon: avatar.weapon, game: game })))),
                avatar.artifacts &&
                    avatar.artifacts.length > 0 &&
                    (() => {
                        const totalScore = scoreCharacterArtifacts(avatar);
                        return (React.createElement("div", { style: contStyle({ margin: '5px 15px' }) },
                            React.createElement("div", { style: contTitleStyle() },
                                game === 'sr' ? '遗器' : '圣遗物',
                                React.createElement("span", { style: { fontSize: '12px', color: '#aaa', marginLeft: '10px', fontWeight: 'normal' } },
                                    "\u8BC4\u5206 ",
                                    totalScore.totalMark,
                                    " \u00B7 ",
                                    totalScore.grade.grade)),
                            React.createElement("div", { style: { padding: '5px 10px' } }, avatar.artifacts.map(art => (React.createElement(ArtifactItem, { key: art.pos, art: art, charName: avatar.name }))))));
                    })(),
                React.createElement("div", { style: {
                        fontSize: '14px',
                        textAlign: 'center',
                        color: '#fff',
                        textShadow: '1px 1px 1px #000',
                        margin: '10px 0'
                    } }, "AlemonJS")))));
}

export { ProfileDetailCard as default };
