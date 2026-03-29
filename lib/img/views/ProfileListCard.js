import React from 'react';
import HTML from './HTML.js';
import { FONT_FAMILY, FONT_NZBZ, contStyle, STAR_COLORS, CONS_COLORS, CONS_SUFFIX } from './shared.js';
import fileUrl from '../../assets/common/bg-01.jpg.js';
import fileUrl$1 from '../../assets/common/main-01.png.js';

function CharItem({ avatar, game }) {
    const border = STAR_COLORS[avatar.rarity] ?? STAR_COLORS[4];
    const consBg = CONS_COLORS[avatar.cons] ?? CONS_COLORS[0];
    const suffix = CONS_SUFFIX[game] ?? '命';
    return (React.createElement("div", { style: {
            width: '75px',
            margin: '5px 0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative'
        } },
        React.createElement("div", { style: {
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                border: `2px solid ${border}`,
                boxShadow: '1px 1px 3px 0 #000',
                overflow: 'hidden',
                margin: '0 5px 0 6px'
            } },
            React.createElement("img", { src: avatar.icon, style: { width: '100%', height: '100%', borderRadius: '50%' } })),
        React.createElement("span", { style: {
                marginTop: '5px',
                display: 'block',
                fontSize: '14px',
                color: '#fff',
                textAlign: 'center',
                textShadow: '0 0 1px #000',
                whiteSpace: 'nowrap'
            } },
            avatar.abbr,
            React.createElement("span", { style: {
                    display: 'inline-block',
                    verticalAlign: 'middle',
                    padding: '1px 4px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    background: consBg,
                    color: '#fff',
                    margin: '-2px 0 0 1px',
                    opacity: 0.9
                } },
                avatar.cons,
                suffix))));
}
function ProfileListCard({ data }) {
    const demo = data.avatars[0]?.abbr ?? '雷神';
    return (React.createElement(HTML, { style: { width: '650px' } },
        React.createElement("div", { style: {
                width: '650px',
                fontFamily: FONT_FAMILY,
                fontSize: '18px',
                color: '#1e1f20',
                backgroundImage: `url(${fileUrl})`,
                backgroundSize: '100% auto',
                backgroundPosition: 'left center'
            } },
            React.createElement("div", { style: {
                    width: '650px',
                    padding: '20px 15px 10px 15px',
                    backgroundImage: `url(${fileUrl$1})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center -25px'
                } },
                React.createElement("div", { style: {
                        borderRadius: '15px',
                        padding: '10px 20px',
                        color: '#fff',
                        marginTop: '10px'
                    } },
                    React.createElement("div", { style: {
                            fontFamily: FONT_NZBZ,
                            fontSize: '36px',
                            textShadow: '0 0 1px #000, 1px 1px 3px rgba(0,0,0,0.9)'
                        } },
                        "#\u9762\u677F\u5217\u8868",
                        React.createElement("span", { style: {
                                display: 'inline-block',
                                marginLeft: '10px',
                                fontSize: '16px',
                                fontFamily: FONT_FAMILY,
                                textShadow: '0 0 1px #000, 1px 1px 3px rgba(0,0,0,0.9)'
                            } },
                            "UID:",
                            data.uid)),
                    React.createElement("div", { style: {
                            fontSize: '16px',
                            textShadow: '0 0 1px #000, 1px 1px 3px rgba(0,0,0,0.9)'
                        } },
                        "\u4F60\u53EF\u4EE5\u4F7F\u7528",
                        React.createElement("span", { style: { color: '#d3bc8e', padding: '0 2px' } },
                            "#",
                            demo,
                            "\u9762\u677F"),
                        "\u3001",
                        React.createElement("span", { style: { color: '#d3bc8e', padding: '0 2px' } },
                            "#",
                            demo,
                            "\u4F24\u5BB3"),
                        "\u3001",
                        React.createElement("span", { style: { color: '#d3bc8e', padding: '0 2px' } },
                            "#",
                            demo,
                            "\u5723\u9057\u7269"),
                        "\u547D\u4EE4\u6765\u67E5\u770B\u9762\u677F\u4FE1\u606F\u4E86")),
                React.createElement("div", { style: contStyle() },
                    React.createElement("div", { style: {
                            display: 'flex',
                            flexWrap: 'wrap',
                            padding: '10px'
                        } }, data.avatars.length > 0 ? (data.avatars.map(av => React.createElement(CharItem, { key: av.id, avatar: av, game: data.game }))) : (React.createElement("div", { style: {
                            width: '100%',
                            textAlign: 'center',
                            padding: '40px 0',
                            color: '#888',
                            fontSize: '14px'
                        } }, "\u6682\u65E0\u9762\u677F\u6570\u636E\uFF0C\u8BF7\u5728\u6E38\u620F\u4E2D\u5C55\u793A\u89D2\u8272\u540E\u91CD\u8BD5"))),
                    React.createElement("div", { style: {
                            display: 'flex',
                            background: 'rgba(0,0,0,0.4)',
                            width: '100%',
                            padding: '10px 15px',
                            fontSize: '12px',
                            color: '#fff'
                        } },
                        React.createElement("span", { style: { width: '50%' } }, data.updateTime ? `更新时间：${data.updateTime}` : ''),
                        React.createElement("span", { style: { width: '50%', textAlign: 'right' } },
                            "\u5F53\u524D\u66F4\u65B0\u670D\u52A1\uFF1A",
                            data.servName ?? (data.game === 'sr' ? 'Mihomo' : 'Enka')))),
                React.createElement("div", { style: {
                        fontSize: '14px',
                        textAlign: 'center',
                        color: '#fff',
                        textShadow: '1px 1px 1px #000',
                        margin: '10px 0'
                    } }, "AlemonJS")))));
}

export { ProfileListCard as default };
