import React from 'react';
import HTML from './HTML.js';
import { FONT_FAMILY, FONT_NZBZ, contStyle, contTitleStyle, CONS_COLORS } from './shared.js';
import fileUrl from '../../assets/common/item/bg4.png.js';
import fileUrl$1 from '../../assets/common/item/bg5.png.js';

function AbyssStatCard({ data }) {
    const sorted = [...data.list].sort((a, b) => b.holdRate - a.holdRate);
    const fiveStars = sorted.filter(c => c.rarity === 5);
    const fourStars = sorted.filter(c => c.rarity === 4);
    return (React.createElement(HTML, { style: { width: '600px' } },
        React.createElement("div", { style: {
                fontFamily: FONT_FAMILY,
                color: '#fff',
                background: '#2a3860',
                position: 'relative',
                paddingBottom: '10px'
            } },
            React.createElement("div", { style: {
                    position: 'relative',
                    borderRadius: '15px',
                    padding: '10px 20px',
                    color: '#fff',
                    marginTop: '30px'
                } },
                React.createElement("div", { style: { fontFamily: FONT_NZBZ, fontSize: '36px' } },
                    "#",
                    data.title || '角色持有率'),
                React.createElement("div", { style: { fontSize: '16px' } }, "\u89D2\u8272\u6301\u6709\u7387 & \u5E73\u5747\u547D\u5EA7\u7EDF\u8BA1")),
            React.createElement("div", { style: contStyle() },
                React.createElement("div", { style: contTitleStyle() },
                    React.createElement("span", { style: { fontFamily: FONT_NZBZ, fontSize: '16px' } },
                        "\u89D2\u8272\u6301\u6709\u7EDF\u8BA1 ",
                        data.version && React.createElement("span", { style: { fontSize: '14px', opacity: 0.7 } },
                            "v",
                            data.version))),
                React.createElement("div", { style: { padding: '10px 16px' } },
                    React.createElement("ul", { style: { listStyle: 'none', padding: 0, margin: 0, fontSize: '13px', color: '#ddd' } },
                        React.createElement("li", { style: { marginBottom: '4px' } }, "\u6570\u636E\u6765\u6E90: \u63D0\u74E6\u7279\u5C0F\u52A9\u624B"),
                        data.update && React.createElement("li", null,
                            "\u66F4\u65B0\u65F6\u95F4: ",
                            data.update)))),
            fiveStars.length > 0 && React.createElement(CharSection, { title: '\u4E94\u661F\u89D2\u8272', chars: fiveStars }),
            fourStars.length > 0 && React.createElement(CharSection, { title: '\u56DB\u661F\u89D2\u8272', chars: fourStars.slice(0, 40) }),
            sorted.length === 0 && (React.createElement("div", { style: contStyle() },
                React.createElement("div", { style: { padding: '24px', textAlign: 'center', opacity: 0.5, fontSize: '14px', color: '#fff' } }, "\u6682\u65E0\u6570\u636E"))),
            React.createElement("div", { style: { position: 'relative', textAlign: 'center', padding: '12px 20px', fontSize: '16px', color: '#fff', textShadow: '1px 1px 1px #000' } }, "Miao By ALemonJS"))));
}
function CharSection({ title, chars }) {
    return (React.createElement("div", { style: contStyle() },
        React.createElement("div", { style: contTitleStyle() },
            React.createElement("span", { style: { fontFamily: FONT_NZBZ, fontSize: '16px' } }, title)),
        React.createElement("div", { style: { padding: '10px', display: 'flex', flexWrap: 'wrap', gap: '10px' } }, chars.map((c, i) => {
            const bgImg = c.rarity === 4 ? fileUrl : fileUrl$1;
            const consColor = CONS_COLORS[Math.round(c.avgCons)] ?? '#888';
            return (React.createElement("div", { key: i, style: {
                    borderRadius: '7px',
                    boxShadow: '0 2px 6px 0 rgba(132,93,90,0.3)',
                    height: '100px',
                    width: '70px',
                    position: 'relative',
                    overflow: 'hidden',
                    background: '#e7e5d9'
                } },
                React.createElement("div", { style: {
                        width: '70px',
                        height: '70px',
                        backgroundImage: `url(${bgImg})`,
                        backgroundSize: '100%',
                        backgroundRepeat: 'no-repeat',
                        borderRadius: '7px 7px 20px 0',
                        overflow: 'hidden',
                        position: 'relative'
                    } },
                    c.faceImg ? (React.createElement("img", { src: c.faceImg, style: { width: '70px', height: '70px', objectFit: 'cover' } })) : (React.createElement("div", { style: { width: '70px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', color: '#999' } }, "?")),
                    React.createElement("div", { style: {
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            zIndex: 9,
                            fontSize: '12px',
                            textAlign: 'center',
                            color: '#fff',
                            padding: '1px 5px',
                            borderRadius: '4px',
                            background: consColor,
                            fontWeight: 'bold'
                        } },
                        "C",
                        c.avgCons.toFixed(1))),
                React.createElement("div", { style: {
                        position: 'absolute',
                        top: '70px',
                        left: 0,
                        width: '100%',
                        lineHeight: '15px',
                        fontSize: '13px',
                        textAlign: 'center',
                        color: '#333',
                        fontWeight: 'bold',
                        padding: '2px 0'
                    } },
                    c.holdRate.toFixed(1),
                    "%")));
        }))));
}

export { AbyssStatCard as default };
