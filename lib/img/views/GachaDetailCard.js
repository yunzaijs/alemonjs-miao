import React from 'react';
import HTML from './HTML.js';
import { elemBgUrl, FONT_FAMILY, FONT_NZBZ, contStyle } from './shared.js';
import fileUrl from '../../assets/common/item/bg5.png.js';

function barClass(count, max) {
    if (count <= 10) {
        return { bg: '#ffeb73', color: '#6f4b00' };
    }
    if (count < max * 0.5) {
        return { bg: '#168b2c', color: '#fff' };
    }
    if (count < max * 0.83) {
        return { bg: '#6939b7', color: '#fff' };
    }
    return { bg: '#9d3333', color: '#fff' };
}
function groupByYear(list) {
    const reversed = [...list].reverse();
    const groups = {};
    for (const item of reversed) {
        const year = item.time.slice(0, 4);
        if (!groups[year]) {
            groups[year] = [];
        }
        groups[year].push(item);
    }
    return groups;
}
function GachaDetailCard({ data }) {
    const { analysis, uid, game } = data;
    const max = game === 'gs' ? 90 : 80;
    const yearGroups = groupByYear(analysis.fiveStarList);
    return (React.createElement(HTML, { style: { width: '600px' } },
        React.createElement("div", { style: {
                fontFamily: FONT_FAMILY,
                color: '#fff',
                backgroundImage: `url(${elemBgUrl()})`,
                backgroundSize: 'cover',
                backgroundPosition: 'left top',
                position: 'relative',
                paddingBottom: '10px'
            } },
            React.createElement("div", { style: { position: 'relative', padding: '20px 20px 10px' } },
                React.createElement("div", { style: { fontFamily: FONT_NZBZ, fontSize: '36px' } },
                    "#",
                    analysis.gachaTypeName),
                React.createElement("div", { style: { fontSize: '14px', opacity: 0.6, marginTop: '4px' } },
                    "UID: ",
                    uid)),
            React.createElement("div", { style: contStyle() },
                React.createElement("div", { style: { padding: '10px 16px', display: 'flex', gap: '6px', flexWrap: 'wrap' } },
                    React.createElement(StatBox, { label: '\u62BD\u5361\u603B\u6570', value: String(analysis.totalCount) }),
                    React.createElement(StatBox, { label: '\u91D1\u5361\u6570', value: String(analysis.fiveStarCount) }),
                    React.createElement(StatBox, { label: '\u7D2B\u5361\u6570', value: String(analysis.fourStarCount) }),
                    React.createElement(StatBox, { label: '\u5DF2\u57AB', value: String(analysis.pityCount) }),
                    React.createElement(StatBox, { label: '\u5E73\u5747\u51FA\u91D1', value: analysis.fiveStarAvg > 0 ? String(analysis.fiveStarAvg) : '-' }))),
            React.createElement("div", { style: { position: 'relative', padding: '6px 20px', fontSize: '12px', opacity: 0.5 } }, "#\u62BD\u5361\u5E2E\u52A9 \u83B7\u53D6\u62BD\u5361\u94FE\u63A5\uFF0C#\u66F4\u65B0\u62BD\u5361\u8BB0\u5F55 \u66F4\u65B0\u4FE1\u606F\uFF0C#\u62BD\u5361\u7EDF\u8BA1 \u53EF\u67E5\u770B\u6309\u5361\u6C60\u5206\u6790"),
            analysis.fiveStarList.length > 0 && (React.createElement("div", { style: { ...contStyle(), background: 'rgba(0,0,0,0.1)' } },
                React.createElement("div", { style: { padding: '0' } }, Object.entries(yearGroups).map(([year, items]) => (React.createElement("div", { key: year },
                    React.createElement("div", { style: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', marginTop: '12px', padding: '4px 0' } },
                        React.createElement("div", { style: { flex: 1, height: '1px', background: 'rgba(255,255,255,0.5)' } }),
                        React.createElement("span", { style: { fontSize: '14px', opacity: 0.8, fontFamily: FONT_NZBZ } }, year),
                        React.createElement("div", { style: { flex: 1, height: '1px', background: 'rgba(255,255,255,0.5)' } })),
                    items.map((item, idx) => {
                        const dateStr = item.time.slice(5, 10);
                        const prevDate = idx > 0 ? items[idx - 1].time.slice(5, 10) : null;
                        const hasDate = idx === 0 || dateStr !== prevDate;
                        const bar = barClass(item.count, max);
                        return (React.createElement("div", { key: idx, style: {
                                height: '38px',
                                display: 'flex',
                                background: 'rgba(0,0,0,0.4)',
                                marginTop: hasDate ? '5px' : '0'
                            } },
                            React.createElement("div", { style: {
                                    width: '97px',
                                    lineHeight: '38px',
                                    paddingLeft: '8px',
                                    background: 'rgba(0,0,0,0.8)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                } },
                                React.createElement("div", { style: {
                                        width: '8px',
                                        height: '8px',
                                        borderRadius: '50%',
                                        background: idx === 0 ? '#4caf50' : idx === items.length - 1 ? '#f44336' : '#fff',
                                        opacity: 0.7,
                                        flexShrink: 0
                                    } }),
                                React.createElement("div", { style: { textAlign: 'center', fontSize: '13px', opacity: hasDate ? 1 : 0 } }, dateStr)),
                            React.createElement("div", { style: {
                                    width: '90px',
                                    textAlign: 'right',
                                    lineHeight: '38px',
                                    paddingRight: '5px',
                                    fontSize: '14px',
                                    color: '#ffd484',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis'
                                } }, item.name),
                            React.createElement("div", { style: { width: '32px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                                React.createElement("div", { style: {
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '5px',
                                        backgroundImage: `url(${fileUrl})`,
                                        backgroundSize: '100% 100%',
                                        backgroundRepeat: 'no-repeat',
                                        overflow: 'hidden'
                                    } }, item.faceImg && React.createElement("img", { src: item.faceImg, style: { width: '32px', height: '32px', objectFit: 'cover' } }))),
                            React.createElement("div", { style: { flex: 1, paddingRight: '15px', display: 'flex', alignItems: 'center' } },
                                React.createElement("div", { style: { position: 'relative', width: `${(item.count / max) * 100}%`, minWidth: '18px' } },
                                    React.createElement("div", { style: {
                                            height: '26px',
                                            lineHeight: '26px',
                                            borderRadius: '0 5px 5px 0',
                                            background: bar.bg,
                                            color: bar.color,
                                            paddingLeft: '5px',
                                            fontSize: '13px',
                                            fontWeight: 'bold'
                                        } }, item.count),
                                    React.createElement("div", { style: {
                                            position: 'absolute',
                                            right: '5px',
                                            top: '4px',
                                            width: '26px',
                                            height: '18px',
                                            lineHeight: '18px',
                                            borderRadius: '15px',
                                            textAlign: 'center',
                                            fontSize: '12px',
                                            fontWeight: 'bold',
                                            background: '#ffeb73',
                                            color: '#6f4b00',
                                            boxShadow: '0 0 3px 0 #6f4b00'
                                        } }, "UP")))));
                    }))))))),
            analysis.fiveStarList.length === 0 && (React.createElement("div", { style: contStyle() },
                React.createElement("div", { style: { padding: '24px', textAlign: 'center', opacity: 0.5, fontSize: '14px' } }, "\u6682\u65E0\u4E94\u661F\u8BB0\u5F55"))),
            React.createElement("div", { style: { position: 'relative', textAlign: 'center', padding: '12px 20px', fontSize: '16px', color: '#fff', textShadow: '1px 1px 1px #000' } }, "Miao By ALemonJS"))));
}
function StatBox({ label, value }) {
    return (React.createElement("div", { style: {
            minWidth: '75px',
            textAlign: 'center',
            padding: '6px 10px',
            background: 'rgba(0,0,0,0.3)',
            borderRadius: '6px'
        } },
        React.createElement("div", { style: { fontSize: '18px', fontWeight: 'bold', fontFamily: FONT_NZBZ } }, value),
        React.createElement("div", { style: { fontSize: '11px', opacity: 0.6, marginTop: '2px' } }, label)));
}

export { GachaDetailCard as default };
