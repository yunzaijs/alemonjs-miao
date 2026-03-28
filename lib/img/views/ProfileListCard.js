import React from 'react';
import HTML from './HTML.js';

const STAR_BORDER = {
    5: '#ce8d54',
    4: '#a0a0e8',
    3: '#6ba8e8'
};
const CONS_BG = {
    0: '#8e8e8e',
    1: '#5d9e5e',
    2: '#5c85c1',
    3: '#7267b0',
    4: '#a85fa5',
    5: '#c2733a',
    6: '#d4a574'
};
function CharItem({ avatar }) {
    const border = STAR_BORDER[avatar.rarity] ?? STAR_BORDER[4];
    const consBg = CONS_BG[avatar.cons] ?? CONS_BG[0];
    return (React.createElement("div", { style: {
            width: '75px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '5px 0'
        } },
        React.createElement("div", { style: {
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                border: `2px solid ${border}`,
                boxShadow: '1px 1px 3px 0 rgba(0,0,0,0.5)',
                overflow: 'hidden',
                position: 'relative'
            } },
            React.createElement("img", { src: avatar.icon, style: { width: '100%', height: '100%', borderRadius: '50%' } })),
        React.createElement("div", { style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2px',
                marginTop: '4px',
                width: '100%'
            } },
            React.createElement("span", { style: {
                    fontSize: '12px',
                    color: '#fff',
                    textShadow: '0 0 3px #000, 1px 1px 2px rgba(0,0,0,0.8)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '55px'
                } }, avatar.abbr),
            React.createElement("span", { style: {
                    fontSize: '10px',
                    background: consBg,
                    color: '#fff',
                    borderRadius: '3px',
                    padding: '0 3px',
                    lineHeight: '14px',
                    flexShrink: 0
                } }, avatar.cons))));
}
function ProfileListCard({ data }) {
    const demo = data.avatars[0]?.abbr ?? '雷神';
    return (React.createElement(HTML, { style: { width: '650px' } },
        React.createElement("div", { style: {
                padding: '0',
                background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                fontFamily: '"tttgbnumber", "PingFang SC", system-ui, sans-serif',
                fontSize: '14px',
                color: '#eee',
                minHeight: '300px'
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
                    "#\u9762\u677F\u5217\u8868",
                    React.createElement("span", { style: {
                            fontSize: '13px',
                            color: '#aaa',
                            fontWeight: 'normal',
                            marginLeft: '12px'
                        } },
                        "UID:",
                        data.uid)),
                React.createElement("div", { style: {
                        fontSize: '12px',
                        color: '#999',
                        marginTop: '6px',
                        lineHeight: '1.6'
                    } },
                    "\u4F60\u53EF\u4EE5\u4F7F\u7528 ",
                    React.createElement("span", { style: { color: '#e8d5b0' } },
                        "#",
                        demo,
                        "\u9762\u677F"),
                    "\u3001",
                    React.createElement("span", { style: { color: '#e8d5b0' } },
                        "#",
                        demo,
                        "\u4F24\u5BB3"),
                    "\u3001",
                    React.createElement("span", { style: { color: '#e8d5b0' } },
                        "#",
                        demo,
                        "\u5723\u9057\u7269"),
                    " \u547D\u4EE4\u6765\u67E5\u770B\u9762\u677F\u4FE1\u606F\u4E86")),
            React.createElement("div", { style: {
                    padding: '14px 20px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start'
                } }, data.avatars.length > 0 ? (data.avatars.map(av => React.createElement(CharItem, { key: av.id, avatar: av }))) : (React.createElement("div", { style: {
                    width: '100%',
                    textAlign: 'center',
                    padding: '40px 0',
                    color: '#666',
                    fontSize: '14px'
                } }, "\u6682\u65E0\u9762\u677F\u6570\u636E\uFF0C\u8BF7\u5728\u6E38\u620F\u4E2D\u5C55\u793A\u89D2\u8272\u540E\u91CD\u8BD5"))),
            React.createElement("div", { style: {
                    padding: '10px 24px 16px',
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '11px',
                    color: '#777'
                } },
                React.createElement("span", null,
                    "\u66F4\u65B0\u65F6\u95F4\uFF1A",
                    data.updateTime),
                React.createElement("span", null,
                    "\u5F53\u524D\u66F4\u65B0\u670D\u52A1\uFF1A",
                    data.servName ?? (data.game === 'sr' ? 'Mihomo' : 'Enka'))))));
}

export { ProfileListCard as default };
