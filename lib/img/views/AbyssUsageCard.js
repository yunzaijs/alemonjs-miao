import React from 'react';
import HTML from './HTML.js';
import { FONT_FAMILY, FONT_NZBZ, contStyle, contTitleStyle } from './shared.js';
import fileUrl from '../../assets/common/item/bg4.png.js';
import fileUrl$1 from '../../assets/common/item/bg5.png.js';

const RANK_GRADIENT = {
    s1: 'linear-gradient(to right, #03ec0ee0 10%, rgba(0,0,0,0.5) 10%)',
    s: 'linear-gradient(to right, #bfff7fe0 10%, rgba(0,0,0,0.5) 10%)',
    a: 'linear-gradient(to right, #ffff7fe0 10%, rgba(0,0,0,0.5) 10%)',
    b: 'linear-gradient(to right, #ffdf7fe0 10%, rgba(0,0,0,0.5) 10%)',
    f: 'linear-gradient(to right, #fc4a4ae0 10%, rgba(0,0,0,0.5) 10%)'
};
const RANK_LABELS = {
    s1: 'S+',
    s: 'S',
    a: 'A',
    b: 'B',
    f: 'C'
};
const RANK_ORDER = ['s1', 's', 'a', 'b', 'f'];
function AbyssUsageCard({ data }) {
    const groups = new Map();
    for (const rank of RANK_ORDER) {
        groups.set(rank, []);
    }
    for (const item of data.list) {
        const arr = groups.get(item.rankClass);
        if (arr) {
            arr.push(item);
        }
        else {
            groups.get('f')?.push(item);
        }
    }
    for (const arr of groups.values()) {
        arr.sort((a, b) => b.useRate - a.useRate);
    }
    const modeName = data.title?.includes('幽境') ? '幽境危战' : '深渊';
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
                    modeName,
                    "\u4F7F\u7528\u7387"),
                React.createElement("div", { style: { fontSize: '16px' } },
                    "\u3010#",
                    modeName,
                    "\u51FA\u573A\u7387\u3011\u51FA\u573A\u603B\u6570/\u603B\u8BB0\u5F55\u6570"),
                React.createElement("div", { style: { fontSize: '16px' } },
                    "\u3010#",
                    modeName,
                    "\u4F7F\u7528\u7387\u3011\u51FA\u573A\u603B\u6570/\u6301\u6709\u8BE5\u89D2\u8272\u7684\u8BB0\u5F55\u6570")),
            React.createElement("div", { style: contStyle() },
                React.createElement("div", { style: contTitleStyle() },
                    React.createElement("span", { style: { fontFamily: FONT_NZBZ, fontSize: '16px' } },
                        modeName,
                        "\u4F7F\u7528\u7387\u7EDF\u8BA1 ",
                        data.version && React.createElement("span", { style: { fontSize: '14px', opacity: 0.7 } },
                            "v",
                            data.version))),
                React.createElement("div", { style: { padding: '10px 10px 10px 0' } },
                    React.createElement("ul", { style: { listStyle: 'none', padding: '0 16px', margin: 0, fontSize: '13px', color: '#ddd' } },
                        React.createElement("li", { style: { marginBottom: '4px' } }, "\u6570\u636E\u6765\u6E90: \u63D0\u74E6\u7279\u5C0F\u52A9\u624B"),
                        data.update && React.createElement("li", null,
                            "\u66F4\u65B0\u65F6\u95F4: ",
                            data.update)))),
            RANK_ORDER.map(rank => {
                const items = groups.get(rank);
                if (!items || items.length === 0) {
                    return null;
                }
                return (React.createElement("div", { key: rank, style: {
                        display: 'flex',
                        alignItems: 'center',
                        margin: '10px 10px 10px 10px',
                        padding: '12px 0',
                        borderRadius: '0 10px 10px 0',
                        backgroundImage: RANK_GRADIENT[rank] ?? RANK_GRADIENT.f,
                        position: 'relative'
                    } },
                    React.createElement("div", { style: {
                            display: 'flex',
                            width: '10%',
                            color: '#fff',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            fontSize: '18px',
                            fontFamily: FONT_NZBZ
                        } }, RANK_LABELS[rank] ?? rank),
                    React.createElement("div", { style: {
                            width: '90%',
                            display: 'flex',
                            gap: '10px',
                            marginLeft: '0',
                            flexWrap: 'wrap',
                            padding: '0 10px'
                        } }, items.map((c, i) => {
                        const bgImg = c.rarity === 4 ? fileUrl : fileUrl$1;
                        return (React.createElement("div", { key: i, style: {
                                borderRadius: '7px',
                                boxShadow: '0 2px 6px 0 rgba(132,93,90,0.3)',
                                height: '88px',
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
                                    overflow: 'hidden'
                                } }, c.faceImg ? (React.createElement("img", { src: c.faceImg, style: {
                                    width: '70px',
                                    height: '70px',
                                    objectFit: 'cover'
                                } })) : (React.createElement("div", { style: {
                                    width: '70px',
                                    height: '70px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '24px',
                                    color: '#999'
                                } }, "?"))),
                            React.createElement("div", { style: {
                                    position: 'absolute',
                                    top: '70px',
                                    left: 0,
                                    width: '100%',
                                    height: '18px',
                                    lineHeight: '18px',
                                    fontSize: '14px',
                                    textAlign: 'center',
                                    color: '#333',
                                    fontWeight: 'bold'
                                } },
                                c.useRate.toFixed(1),
                                "%")));
                    }))));
            }),
            data.list.length === 0 && (React.createElement("div", { style: contStyle() },
                React.createElement("div", { style: { padding: '24px', textAlign: 'center', opacity: 0.5, fontSize: '14px', color: '#fff' } }, "\u6682\u65E0\u6570\u636E"))),
            React.createElement("div", { style: { position: 'relative', textAlign: 'center', padding: '12px 20px', fontSize: '16px', color: '#fff', textShadow: '1px 1px 1px #000' } }, "Miao By ALemonJS"))));
}

export { AbyssUsageCard as default };
