import React from 'react';
import HTML from './HTML.js';
import { FONT_FAMILY, elemBgUrl, FONT_NZBZ, contStyle, contTitleStyle, CONS_COLORS, RARITY_COLORS } from './shared.js';

function SingleAvatarCard({ avatar, relation, uid }) {
    const cons = avatar.actived_constellation_num;
    const consColor = CONS_COLORS[cons] ?? CONS_COLORS[0];
    const weapon = avatar.weapon;
    return (React.createElement("div", { style: { position: 'relative', width: '100%' } },
        React.createElement("img", { src: avatar.image || avatar.icon, style: { width: '100%', display: 'block', marginBottom: '-1px' } }),
        React.createElement("div", { style: {
                position: 'absolute',
                left: 0,
                top: 0,
                padding: '5px 10px',
                textShadow: '0 0 3px #000, 3px 3px 5px #000'
            } },
            React.createElement("div", { style: { paddingLeft: '10px', display: 'inline-block', whiteSpace: 'nowrap', position: 'relative' } },
                React.createElement("strong", { style: { fontFamily: FONT_NZBZ, fontSize: '60px', letterSpacing: '5px', fontWeight: 'normal' } }, avatar.name),
                relation && React.createElement("span", { style: { fontSize: '20px', color: '#ff8a80', marginLeft: '10px' } },
                    "\u2665 ",
                    relation),
                React.createElement("span", { style: {
                        fontSize: '20px',
                        padding: '3px 8px',
                        borderRadius: '8px',
                        margin: '10px 0',
                        textShadow: '0 0 1px #000',
                        background: consColor,
                        color: '#fff',
                        verticalAlign: 'bottom'
                    } },
                    cons,
                    "\u547D")),
            React.createElement("div", { style: { fontSize: '20px', height: '25px', lineHeight: '25px', paddingLeft: '10px' } },
                React.createElement("span", null,
                    "Uid:",
                    uid),
                avatar.level > 0 && React.createElement("span", { style: { marginLeft: '10px' } },
                    "Lv.",
                    avatar.level))),
        React.createElement("div", { style: {
                position: 'absolute',
                bottom: '25px',
                left: 0,
                right: 0,
                display: 'flex',
                padding: '4px'
            } }, weapon && (React.createElement("div", { style: {
                width: '200px',
                height: '90px',
                margin: '4px',
                position: 'relative',
                textShadow: '1px 1px 1px #000',
                background: 'rgba(0,0,0,0.4)',
                borderRadius: '8px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                padding: '5px'
            } },
            React.createElement("div", { style: { width: '80px', height: '80px', flexShrink: 0 } },
                React.createElement("img", { src: weapon.icon, style: { width: '100%', height: '100%', objectFit: 'contain' } })),
            React.createElement("div", { style: { paddingLeft: '5px' } },
                React.createElement("strong", { style: { fontSize: '18px', display: 'block' } }, weapon.name),
                React.createElement("div", { style: { fontSize: '14px', color: RARITY_COLORS[weapon.rarity] ?? '#ccc' } }, '★'.repeat(weapon.rarity)),
                React.createElement("div", { style: { fontSize: '14px' } },
                    "Lv.",
                    weapon.level,
                    ' ',
                    React.createElement("span", { style: {
                            fontSize: '13px',
                            background: weapon.affix_level >= 4 ? '#ff5722' : '#62a8ea',
                            color: '#fff',
                            padding: '1px 4px',
                            borderRadius: '3px'
                        } },
                        "\u7CBE",
                        weapon.affix_level)))))),
        React.createElement("div", { style: {
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '25px',
                lineHeight: '25px',
                padding: '0 10px',
                background: 'rgba(0,0,0,0.5)',
                textAlign: 'right',
                fontSize: '12px'
            } }, "AlemonJS \u00B7 Miao By ALemonJS")));
}
function AvatarGrid({ avatars }) {
    const sorted = [...avatars].sort((a, b) => {
        if (b.level !== a.level) {
            return b.level - a.level;
        }
        if (b.rarity !== a.rarity) {
            return b.rarity - a.rarity;
        }
        return b.actived_constellation_num - a.actived_constellation_num;
    });
    return (React.createElement("div", { style: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
            padding: '10px 12px'
        } }, sorted.map(av => {
        const cons = av.actived_constellation_num;
        const consColor = CONS_COLORS[cons] ?? CONS_COLORS[0];
        const color = RARITY_COLORS[av.rarity] ?? '#ccc';
        return (React.createElement("div", { key: av.id, style: {
                width: '68px',
                textAlign: 'center',
                background: 'rgba(0,0,0,0.25)',
                borderRadius: '8px',
                overflow: 'hidden',
                paddingBottom: '4px'
            } },
            React.createElement("div", { style: {
                    width: '68px',
                    height: '68px',
                    position: 'relative',
                    border: `2px solid ${color}`,
                    borderRadius: '8px 8px 0 0',
                    overflow: 'hidden',
                    background: 'rgba(0,0,0,0.3)'
                } },
                React.createElement("img", { src: av.icon, style: { width: '100%', height: '100%', objectFit: 'cover' } }),
                React.createElement("span", { style: {
                        position: 'absolute',
                        bottom: '0',
                        right: '0',
                        fontSize: '10px',
                        background: consColor,
                        color: '#fff',
                        padding: '0 4px',
                        borderRadius: '6px 0 0 0'
                    } },
                    cons,
                    "\u547D")),
            React.createElement("div", { style: {
                    fontSize: '11px',
                    marginTop: '2px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                } }, av.name),
            React.createElement("div", { style: { fontSize: '10px', opacity: 0.6 } },
                "Lv.",
                av.level)));
    })));
}
function AvatarCard({ data }) {
    const isSingle = !!data.avatar;
    const avatarCount = data.avatars?.length ?? (data.avatar ? 1 : 0);
    if (isSingle && data.avatar) {
        return (React.createElement(HTML, { style: { width: '600px' } },
            React.createElement("div", { style: {
                    fontFamily: FONT_FAMILY,
                    color: '#fff',
                    backgroundColor: '#1234'
                } },
                React.createElement(SingleAvatarCard, { avatar: data.avatar, relation: data.relation, uid: data.uid }))));
    }
    return (React.createElement(HTML, { style: { width: '600px' } },
        React.createElement("div", { style: {
                fontFamily: FONT_FAMILY,
                color: '#fff',
                backgroundImage: `url(${elemBgUrl(data.avatars?.[0]?.element)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'left top',
                position: 'relative',
                paddingBottom: '10px'
            } },
            React.createElement("div", { style: {
                    position: 'relative',
                    padding: '20px 20px 10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end'
                } },
                React.createElement("div", null,
                    React.createElement("div", { style: { fontFamily: FONT_NZBZ, fontSize: '28px', color: '#d3bc8e' } },
                        "#",
                        data.title),
                    React.createElement("div", { style: { fontSize: '13px', opacity: 0.6, marginTop: '4px' } },
                        "\u5171 ",
                        avatarCount,
                        " \u4E2A\u89D2\u8272")),
                React.createElement("div", { style: { fontSize: '13px', opacity: 0.5 } },
                    "UID:",
                    data.uid)),
            React.createElement("div", { style: { position: 'relative' } }, data.avatars && data.avatars.length > 0 ? (React.createElement("div", { style: contStyle() },
                React.createElement("div", { style: contTitleStyle() },
                    React.createElement("span", { style: { fontFamily: FONT_NZBZ, fontSize: '18px' } }, "\u89D2\u8272\u4E00\u89C8")),
                React.createElement(AvatarGrid, { avatars: data.avatars }))) : (React.createElement("div", { style: {
                    ...contStyle(),
                    padding: '20px',
                    textAlign: 'center',
                    opacity: 0.6
                } }, "\u6682\u65E0\u89D2\u8272\u6570\u636E"))),
            React.createElement("div", { style: {
                    position: 'relative',
                    textAlign: 'right',
                    padding: '8px 20px',
                    fontSize: '12px',
                    opacity: 0.4
                } }, "Miao By ALemonJS"))));
}

export { AvatarCard as default };
