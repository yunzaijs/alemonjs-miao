import React from 'react';
import HTML from './HTML.js';
import { elemBgUrl, FONT_FAMILY, FONT_NZBZ } from './shared.js';
import fileUrl from '../../assets/common/item/bg5.png.js';
import fileUrl$1 from '../../assets/common/item/bg4.png.js';

function SingleBannerCard({ data }) {
    const daysDiff = data.records.length > 0 ? data.records[0].daysSince : 0;
    return (React.createElement(HTML, { style: { width: '600px' } },
        React.createElement("div", { style: {
                fontFamily: FONT_FAMILY,
                color: '#1e1f20',
                backgroundImage: `url(${elemBgUrl(data.element)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'left top',
                backgroundColor: '#3b4251',
                position: 'relative',
                paddingBottom: '10px'
            } },
            React.createElement("div", { style: { position: 'relative', margin: '20px 0', padding: '0 20px', color: '#fff', textShadow: '0 0 1px #000, 1px 1px 3px rgba(0,0,0,0.9)' } },
                React.createElement("div", { style: { fontFamily: FONT_NZBZ, fontSize: '36px' } },
                    "#",
                    data.charName,
                    "\u590D\u523B\u7EDF\u8BA1"),
                React.createElement("div", { style: { fontSize: '16px', marginTop: '4px' } },
                    "\u5171\u8BB0\u590D\u523B",
                    data.records.length,
                    "\u6B21\uFF0C",
                    daysDiff > 0 ? `已${daysDiff}天未复刻` : '当前UP')),
            React.createElement("div", { style: {
                    position: 'relative',
                    width: '560px',
                    margin: '0 auto',
                    backgroundColor: '#f5eeea',
                    padding: '20px 30px',
                    borderRadius: '16px'
                } },
                data.records.length === 0 && React.createElement("div", { style: { textAlign: 'center', padding: '20px', opacity: 0.5, fontSize: '14px' } }, "\u672A\u627E\u5230\u5361\u6C60\u8BB0\u5F55"),
                data.records.map((r, i) => {
                    const prevDaysSince = i < data.records.length - 1 ? data.records[i + 1].daysSince : 0;
                    const diffDay = i < data.records.length - 1 ? r.daysSince - prevDaysSince : 0;
                    return (React.createElement("div", { key: i, style: { borderRadius: '5px', backgroundColor: '#e7e2d6', padding: '10px', margin: '10px 0' } },
                        React.createElement("div", { style: {
                                width: '100%',
                                backgroundColor: '#c19f77',
                                backgroundImage: 'linear-gradient(to right, #c19f77 1%, #f2f0ea 1%)',
                                padding: '15px 20px'
                            } },
                            React.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: '8px' } },
                                React.createElement("span", { style: {
                                        backgroundColor: '#d27a7a',
                                        color: '#fff',
                                        fontWeight: 100,
                                        fontSize: '12px',
                                        padding: '4px 8px',
                                        borderRadius: '5px'
                                    } },
                                    r.version,
                                    " ",
                                    r.phase === 1 ? '上半' : '下半'),
                                React.createElement("span", { style: { fontSize: '14px' } }, diffDay > 0 ? `距上次复刻${diffDay}天` : i === data.records.length - 1 ? '首次UP' : '')),
                            data.faceImg && (React.createElement("div", { style: { marginTop: '10px', display: 'flex', gap: '5px' } },
                                React.createElement("div", { style: {
                                        width: '50px',
                                        minHeight: '60px',
                                        backgroundColor: '#e7e5d9',
                                        fontSize: '10px',
                                        textAlign: 'center',
                                        borderRadius: '5px',
                                        overflow: 'hidden'
                                    } },
                                    React.createElement("div", { style: {
                                            width: '50px',
                                            height: '50px',
                                            backgroundImage: `url(${data.rarity === 5 ? fileUrl : fileUrl$1})`,
                                            backgroundSize: '100% 100%'
                                        } },
                                        React.createElement("img", { src: data.faceImg, style: { width: '50px', height: '50px', objectFit: 'cover' } })),
                                    React.createElement("div", { style: { padding: '3px 1px', fontSize: '10px' } }, data.charName)))))));
                })),
            React.createElement("div", { style: { position: 'relative', textAlign: 'center', padding: '12px 20px', fontSize: '16px', color: '#fff', textShadow: '1px 1px 1px #000' } }, "Miao By ALemonJS"))));
}
function AllBannerCard({ data }) {
    return (React.createElement(HTML, { style: { width: '600px' } },
        React.createElement("div", { style: {
                fontFamily: FONT_FAMILY,
                color: '#1e1f20',
                backgroundImage: `url(${elemBgUrl()})`,
                backgroundSize: 'cover',
                backgroundPosition: 'left top',
                backgroundColor: '#3b4251',
                position: 'relative',
                paddingBottom: '10px'
            } },
            React.createElement("div", { style: { position: 'relative', margin: '20px 0', padding: '0 20px', color: '#fff', textShadow: '0 0 1px #000, 1px 1px 3px rgba(0,0,0,0.9)' } },
                React.createElement("div", { style: { fontFamily: FONT_NZBZ, fontSize: '36px' } }, "#\u4E94\u661F\u89D2\u8272\u590D\u523B\u7EDF\u8BA1"),
                React.createElement("div", { style: { fontSize: '16px', marginTop: '4px' } },
                    "\u6309\u6700\u4E45\u672A\u590D\u523B\u6392\u5E8F \u00B7 \u5171 ",
                    data.list.length,
                    " \u4E2A\u89D2\u8272")),
            React.createElement("div", { style: {
                    position: 'relative',
                    width: '560px',
                    margin: '0 auto',
                    backgroundColor: '#f5eeea',
                    padding: '20px 30px',
                    borderRadius: '16px'
                } },
                React.createElement("div", { style: { display: 'flex', flexWrap: 'wrap', gap: '8px' } }, data.list.map((c, i) => {
                    const bgImg = c.rarity === 5 ? fileUrl : fileUrl$1;
                    const isLong = c.daysSince > 300;
                    return (React.createElement("div", { key: i, style: {
                            width: '90px',
                            backgroundColor: '#e7e5d9',
                            borderRadius: '5px',
                            overflow: 'hidden',
                            textAlign: 'center',
                            boxShadow: isLong ? '0 0 6px 0 #d27a7a' : '0 1px 3px rgba(0,0,0,0.15)'
                        } },
                        React.createElement("div", { style: {
                                width: '90px',
                                height: '90px',
                                backgroundImage: `url(${bgImg})`,
                                backgroundSize: '100% 100%',
                                position: 'relative'
                            } },
                            c.faceImg ? (React.createElement("img", { src: c.faceImg, style: { width: '90px', height: '90px', objectFit: 'cover' } })) : (React.createElement("div", { style: {
                                    width: '90px',
                                    height: '90px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '28px',
                                    color: '#999'
                                } }, "?")),
                            React.createElement("div", { style: {
                                    position: 'absolute',
                                    right: 0,
                                    bottom: 0,
                                    borderRadius: '10px 0 0 0',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    padding: '2px 6px',
                                    background: '#ffeb73',
                                    color: '#6f4b00'
                                } },
                                c.upCount,
                                "\u6B21")),
                        React.createElement("div", { style: { fontSize: '12px', lineHeight: '20px', fontWeight: 'bold' } }, c.name),
                        React.createElement("div", { style: { fontSize: '10px', lineHeight: '16px', color: isLong ? '#d27a7a' : '#888', paddingBottom: '2px' } },
                            c.daysSince,
                            "\u5929 \u00B7 ",
                            c.lastVersion)));
                }))),
            React.createElement("div", { style: { position: 'relative', textAlign: 'center', padding: '12px 20px', fontSize: '16px', color: '#fff', textShadow: '1px 1px 1px #000' } }, "Miao By ALemonJS"))));
}
function BannerCard({ data }) {
    if (data.mode === 'single') {
        return React.createElement(SingleBannerCard, { data: data });
    }
    return React.createElement(AllBannerCard, { data: data });
}

export { BannerCard as default };
