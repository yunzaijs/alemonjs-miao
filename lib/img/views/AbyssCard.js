import React from 'react';
import HTML from './HTML.js';
import { FONT_FAMILY, FONT_NZBZ, contStyle } from './shared.js';

function StatCard({ title, avatar }) {
    if (!avatar) {
        return null;
    }
    return (React.createElement("div", { style: contStyle({ margin: '5px 10px 5px 5px', width: '175px', height: '300px', position: 'relative', overflow: 'hidden' }) },
        React.createElement("div", { style: {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                background: 'rgba(0,0,0,0.5)',
                padding: '5px 10px',
                textShadow: '0 0 1px #000',
                zIndex: 2
            } },
            React.createElement("span", { style: { display: 'block', fontFamily: FONT_NZBZ, fontSize: '24px', fontWeight: 'normal' } }, title),
            React.createElement("strong", { style: { display: 'block', fontSize: '30px', textShadow: '0 0 3px #000' } }, avatar.value >= 10000 ? `${Math.floor(avatar.value / 10000)}W` : avatar.value)),
        React.createElement("div", { style: {
                width: '175px',
                height: '300px',
                backgroundImage: `url(${avatar.icon})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% auto',
                backgroundPosition: '0 10%'
            } })));
}
function AvatarIcon({ avatar, size = 48 }) {
    const isStar5 = avatar.rarity === 5;
    const bgClass = isStar5 ? 'rgba(239,214,137,0.6)' : 'rgba(137,189,233,0.6)';
    const innerSize = Math.round(size * 0.88);
    return (React.createElement("div", { style: {
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: '50%',
            overflow: 'hidden',
            background: bgClass,
            marginRight: '2px',
            boxShadow: '0 0 1px 0 rgba(0,0,0,0.5)'
        } },
        React.createElement("img", { src: avatar.icon, style: {
                width: `${innerSize}px`,
                height: `${innerSize}px`,
                margin: `${Math.round((size - innerSize) / 2)}px`,
                objectFit: 'cover',
                backgroundSize: 'auto 100%',
                backgroundPosition: 'center'
            } })));
}
function StarDisplay({ count, max }) {
    const arrs = Array.from({ length: max }, (_, i) => i);
    return (React.createElement("div", null, arrs.map((_, i) => (React.createElement("span", { key: i, style: {
            display: 'inline-block',
            width: '14px',
            height: '14px',
            fontSize: '14px',
            color: i < count ? '#ffd700' : '#555'
        } }, "\u2605")))));
}
function FloorSection({ floor }) {
    return (React.createElement("div", { style: contStyle() },
        React.createElement("div", { style: { padding: '10px 15px' } },
            React.createElement("div", { style: { margin: '-3px 0 8px', display: 'flex', alignItems: 'center', gap: '10px' } },
                React.createElement("strong", { style: { color: '#d3bc8e', fontSize: '18px', fontFamily: FONT_NZBZ, fontWeight: 'normal', marginRight: '10px' } },
                    "\u7B2C",
                    floor.index,
                    "\u5C42"),
                React.createElement(StarDisplay, { count: floor.star, max: floor.max_star }),
                React.createElement("span", { style: { fontSize: '15px' } },
                    floor.star,
                    "/",
                    floor.max_star)),
            floor.levels.length > 0 && floor.levels[0]?.battles?.length > 0 && (React.createElement("div", { style: { display: 'flex', marginBottom: '10px' } },
                React.createElement("div", { style: { display: 'flex', gap: '4px' } }, floor.levels[0].battles[0]?.avatars?.map(av => (React.createElement(AvatarIcon, { key: av.id, avatar: av, size: 48 })))),
                React.createElement("div", { style: { width: '1px', background: 'rgba(255,255,255,0.5)', height: '80px', margin: '15px 8px 0' } }),
                React.createElement("div", { style: { display: 'flex', gap: '4px' } }, floor.levels[0].battles[1]?.avatars?.map(av => (React.createElement(AvatarIcon, { key: av.id, avatar: av, size: 48 })))))),
            React.createElement("div", { style: { display: 'flex', width: 'calc(100% + 30px)', margin: '10px -15px -10px' } }, floor.levels.map((level, idx) => (React.createElement("div", { key: level.index, style: {
                    padding: '5px 10px 7px',
                    width: '33%',
                    boxShadow: '0 0 1px 0 #fff',
                    background: idx % 2 === 1 ? 'rgba(255,255,255,0.1)' : 'transparent'
                } },
                React.createElement("div", { style: { display: 'flex', marginBottom: '5px', paddingLeft: '8px', alignItems: 'center' } },
                    React.createElement("div", { style: { fontSize: '16px', fontWeight: 'bold', whiteSpace: 'nowrap' } },
                        "\u7B2C",
                        level.index,
                        "\u95F4"),
                    React.createElement(StarDisplay, { count: level.star, max: level.max_star })),
                React.createElement("div", { style: { display: 'flex', width: '100%' } }, level.battles.map((battle, bIdx) => (React.createElement("div", { key: bIdx, style: { display: 'flex', position: 'relative', paddingRight: bIdx === 0 ? '15px' : '0' } },
                    battle.avatars.map(av => (React.createElement(AvatarIcon, { key: av.id, avatar: av, size: 33 }))),
                    bIdx === 0 && (React.createElement("div", { style: {
                            position: 'absolute',
                            width: '1px',
                            height: '16px',
                            background: 'rgba(255,255,255,0.3)',
                            right: '8px',
                            top: '50%',
                            marginTop: '-8px'
                        } })))))))))))));
}
function AbyssCard({ data }) {
    const gameLabel = data.game === 'sr' ? '混沌回忆' : '深渊';
    const statList = [
        { title: '最强一击', avatar: data.damage_rank?.[0] },
        { title: '最多击破', avatar: data.defeat_rank?.[0] },
        { title: '最高承伤', avatar: data.take_damage_rank?.[0] },
        { title: '元素战技', avatar: data.normal_skill_rank?.[0] },
        { title: '元素爆发', avatar: data.energy_skill_rank?.[0] }
    ];
    const displayFloors = (data.floors ?? []).filter(f => f.levels?.length > 0).slice(-4);
    return (React.createElement(HTML, { style: { width: '970px' } },
        React.createElement("div", { style: {
                width: '970px',
                fontFamily: FONT_FAMILY,
                color: '#fff',
                background: '#2a3860',
                position: 'relative',
                padding: '5px 0 10px 5px'
            } },
            React.createElement("div", { style: {
                    display: 'flex',
                    width: '100%',
                    padding: '10px 10px 0'
                } },
                React.createElement("div", { style: { width: '70%' } },
                    React.createElement("div", { style: { fontFamily: FONT_NZBZ, fontSize: '45px', paddingBottom: '10px' } },
                        "#",
                        gameLabel,
                        React.createElement("span", { style: { fontSize: '30px', marginLeft: '10px', color: '#d3bc8e' } },
                            data.period ?? '',
                            " \u00B7 ",
                            data.total_battle_times,
                            "\u6B21\u6218\u6597"))),
                React.createElement("div", { style: { width: '30%', textAlign: 'right', paddingTop: '25px', paddingRight: '10px', fontSize: '25px' } },
                    "UID:",
                    data.uid)),
            statList.some(s => s.avatar) && (React.createElement("div", { style: { display: 'flex', padding: '5px' } }, statList.map((s, i) => s.avatar && React.createElement(StatCard, { key: i, title: s.title, avatar: s.avatar })))),
            displayFloors.map(floor => (React.createElement(FloorSection, { key: floor.index, floor: floor }))),
            React.createElement("div", { style: contStyle() },
                React.createElement("div", { style: { padding: '10px 15px', fontSize: '16px' } },
                    React.createElement("div", null, "\u89D2\u8272\u88C5\u5907\u4E0E\u5723\u9057\u7269\u4E3A\u5F53\u524D\u6700\u65B0\u72B6\u6001"))),
            React.createElement("div", { style: { position: 'relative', textAlign: 'center', padding: '12px 20px', fontSize: '16px', color: '#fff', textShadow: '1px 1px 1px #000' } }, "Miao By ALemonJS"))));
}

export { AbyssCard as default };
