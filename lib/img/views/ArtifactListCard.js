import { scoreCharacterArtifacts } from '../../model/miao/artisMark.js';
import React from 'react';
import HTML from './HTML.js';
import { elemBgUrl, FONT_FAMILY, FONT_NZBZ, contStyle, formatDateZh, STAR_COLORS } from './shared.js';

const POS_NAMES_GS = ['生之花', '死之羽', '时之沙', '空之杯', '理之冠'];
const POS_NAMES_SR = ['头部', '手部', '躯干', '脚部', '位面球', '连结绳'];
function CharArtifactRow({ avatar, game, score }) {
    const border = STAR_COLORS[avatar.rarity] ?? STAR_COLORS[4];
    const posNames = game === 'sr' ? POS_NAMES_SR : POS_NAMES_GS;
    return (React.createElement("div", { style: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 14px',
            background: 'rgba(0,0,0,0.2)',
            borderRadius: '8px',
            marginBottom: '6px'
        } },
        React.createElement("div", { style: {
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                border: `2px solid ${border}`,
                overflow: 'hidden',
                flexShrink: 0
            } },
            React.createElement("img", { src: avatar.icon, style: { width: '100%', height: '100%' } })),
        React.createElement("div", { style: { width: '60px', flexShrink: 0 } },
            React.createElement("div", { style: {
                    fontSize: '13px',
                    fontWeight: 'bold',
                    color: '#fff',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                } }, avatar.abbr || avatar.name),
            React.createElement("div", { style: { fontSize: '11px', color: '#aaa', marginTop: '2px' } },
                "Lv.",
                avatar.level)),
        React.createElement("div", { style: { display: 'flex', gap: '4px', flex: 1 } }, score.artifacts.map((art, i) => (React.createElement("div", { key: art.pos, style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: 'rgba(0,0,0,0.25)',
                borderRadius: '6px',
                padding: '5px 6px',
                minWidth: '44px',
                flex: 1
            } },
            React.createElement("span", { style: { fontSize: '10px', color: '#888' } }, posNames[i] ?? `#${art.pos}`),
            React.createElement("span", { style: {
                    fontSize: '13px',
                    fontWeight: 'bold',
                    color: art.grade.color,
                    marginTop: '2px'
                } }, art.mark),
            React.createElement("span", { style: { fontSize: '10px', color: art.grade.color } }, art.grade.grade))))),
        React.createElement("div", { style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flexShrink: 0,
                minWidth: '50px'
            } },
            React.createElement("span", { style: { fontSize: '10px', color: '#888' } }, "\u603B\u5206"),
            React.createElement("span", { style: {
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: score.grade.color
                } }, score.totalMark),
            React.createElement("span", { style: {
                    fontSize: '11px',
                    fontWeight: 'bold',
                    color: score.grade.color
                } }, score.grade.grade))));
}
function ArtifactListCard({ data }) {
    const { avatars, game, uid } = data;
    const scored = avatars
        .filter(av => av.artifacts && av.artifacts.length > 0)
        .map(av => ({ av, score: scoreCharacterArtifacts(av) }))
        .sort((a, b) => b.score.totalMark - a.score.totalMark);
    const bgUrl = elemBgUrl(avatars[0]?.element);
    return (React.createElement(HTML, { style: { width: '660px' } },
        React.createElement("div", { style: {
                width: '660px',
                fontFamily: FONT_FAMILY,
                fontSize: '18px',
                color: '#1e1f20',
                backgroundImage: `url(${bgUrl})`,
                backgroundSize: '100% auto',
                backgroundPosition: 'left top'
            } },
            React.createElement("div", { style: {
                    width: '660px',
                    padding: '20px 15px 10px 15px'
                } },
                React.createElement("div", { style: { borderRadius: '15px', padding: '10px 20px', color: '#fff', marginTop: '10px' } },
                    React.createElement("div", { style: {
                            fontFamily: FONT_NZBZ,
                            fontSize: '36px',
                            textShadow: '0 0 1px #000, 1px 1px 3px rgba(0,0,0,0.9)'
                        } },
                        game === 'sr' ? '#遗器列表' : '#圣遗物列表',
                        React.createElement("span", { style: {
                                display: 'inline-block',
                                marginLeft: '10px',
                                fontSize: '16px',
                                fontFamily: FONT_FAMILY,
                                textShadow: '0 0 1px #000, 1px 1px 3px rgba(0,0,0,0.9)'
                            } },
                            "UID:",
                            uid)),
                    React.createElement("div", { style: { fontSize: '16px', textShadow: '0 0 1px #000, 1px 1px 3px rgba(0,0,0,0.9)' } },
                        "\u5171 ",
                        scored.length,
                        " \u540D\u89D2\u8272\uFF0C\u6309",
                        game === 'sr' ? '遗器' : '圣遗物',
                        "\u8BC4\u5206\u6392\u5E8F")),
                React.createElement("div", { style: contStyle() },
                    React.createElement("div", { style: { padding: '10px' } }, scored.length > 0 ? (scored.map(({ av, score }) => React.createElement(CharArtifactRow, { key: av.id, avatar: av, game: game, score: score }))) : (React.createElement("div", { style: { width: '100%', textAlign: 'center', padding: '40px 0', color: '#888', fontSize: '14px' } },
                        "\u6682\u65E0",
                        game === 'sr' ? '遗器' : '圣遗物',
                        "\u6570\u636E"))),
                    React.createElement("div", { style: {
                            display: 'flex',
                            background: 'rgba(0,0,0,0.4)',
                            width: '100%',
                            padding: '10px 15px',
                            fontSize: '12px',
                            color: '#fff'
                        } },
                        React.createElement("span", { style: { width: '50%' } },
                            "\u6570\u636E\u6765\u6E90: ",
                            game === 'sr' ? 'Mihomo' : 'Enka Network'),
                        React.createElement("span", { style: { width: '50%', textAlign: 'right' } }, formatDateZh()))),
                React.createElement("div", { style: { fontSize: '14px', textAlign: 'center', color: '#fff', textShadow: '1px 1px 1px #000', margin: '10px 0' } }, "Miao By ALemonJS")))));
}

export { ArtifactListCard as default };
