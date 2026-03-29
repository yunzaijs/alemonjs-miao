import React from 'react';
import HTML from './HTML.js';
import { elemBgUrl, FONT_FAMILY, FONT_NZBZ, contStyle } from './shared.js';
import fileUrl from '../../assets/common/item/bg4.png.js';
import fileUrl$1 from '../../assets/common/item/bg5.png.js';

function GachaStatCard({ data }) {
    const { uid, analyses, totalCount, totalFive, totalFour } = data;
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
                React.createElement("div", { style: { fontFamily: FONT_NZBZ, fontSize: '36px' } }, "#\u62BD\u5361\u7EDF\u8BA1"),
                React.createElement("div", { style: { fontSize: '14px', opacity: 0.6, marginTop: '4px' } },
                    "UID: ",
                    uid)),
            React.createElement("div", { style: contStyle() },
                React.createElement("div", { style: { padding: '10px 16px', display: 'flex', gap: '6px', flexWrap: 'wrap' } },
                    React.createElement(StatLi, { label: '\u62BD\u5361\u603B\u6570', value: totalCount }),
                    React.createElement(StatLi, { label: '\u91D1\u5361', value: totalFive }),
                    React.createElement(StatLi, { label: '\u7D2B\u5361', value: totalFour }),
                    React.createElement(StatLi, { label: '\u84DD\u5361', value: totalCount - totalFive - totalFour }))),
            React.createElement("div", { style: { position: 'relative', padding: '6px 20px', fontSize: '12px', opacity: 0.5 } }, "#\u89D2\u8272\u7EDF\u8BA1/#\u6B66\u5668\u7EDF\u8BA1 \u89D2\u8272/\u6B66\u5668\u6C60\u7EDF\u8BA1\uFF0C#\u5E38\u9A7B\u7EDF\u8BA1 \u5E38\u9A7B\u6C60\u7EDF\u8BA1\uFF0C#\u62BD\u5361\u5E2E\u52A9 \u83B7\u53D6\u5E2E\u52A9"),
            analyses.map((a, idx) => (React.createElement(PoolSection, { key: idx, analysis: a, game: data.game }))),
            analyses.length === 0 && (React.createElement("div", { style: contStyle() },
                React.createElement("div", { style: { padding: '24px', textAlign: 'center', opacity: 0.5, fontSize: '14px' } }, "\u6682\u65E0\u62BD\u5361\u8BB0\u5F55"))),
            React.createElement("div", { style: { position: 'relative', textAlign: 'center', padding: '12px 20px', fontSize: '16px', color: '#fff', textShadow: '1px 1px 1px #000' } }, "Miao By ALemonJS"))));
}
function PoolSection({ analysis, game }) {
    const cardWidth = game === 'gs' ? 69 : 90;
    return (React.createElement("div", { style: { ...contStyle(), overflow: 'hidden' } },
        React.createElement("div", { style: {
                display: 'flex',
                background: 'rgba(0,0,0,0.6)',
                padding: 0
            } },
            React.createElement("div", { style: {
                    background: 'rgba(0,0,0,0.8)',
                    padding: '10px 0',
                    display: 'flex',
                    alignItems: 'center',
                    borderRight: '1px solid rgba(255,255,255,0.3)',
                    width: '130px',
                    justifyContent: 'center'
                } },
                React.createElement("span", { style: { fontSize: '20px', fontWeight: 'bold', fontFamily: FONT_NZBZ } }, analysis.gachaTypeName)),
            React.createElement("div", { style: { display: 'flex', padding: '10px 20px 0', gap: '10px', flexWrap: 'wrap' } },
                React.createElement(InfoNum, { label: '\u603B\u62BD\u5361', value: analysis.totalCount }),
                React.createElement(InfoNum, { label: '\u91D1\u5361', value: analysis.fiveStarCount }),
                React.createElement(InfoNum, { label: '\u7D2B\u5361', value: analysis.fourStarCount }),
                analysis.pityCount > 0 && React.createElement(InfoNum, { label: '\u5DF2\u57AB', value: analysis.pityCount }),
                analysis.fiveStarAvg > 0 && React.createElement(InfoNum, { label: '\u5E73\u5747\u51FA\u91D1', value: analysis.fiveStarAvg }))),
        analysis.fiveStarList.length > 0 && (React.createElement("div", { style: {
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'flex-start',
                background: 'rgba(0,0,0,0.5)',
                padding: '5px 8px',
                gap: '3px'
            } }, analysis.fiveStarList.map((item, i) => {
            const bgImg = item.rarity === 4 ? fileUrl : fileUrl$1;
            return (React.createElement("div", { key: i, style: { textAlign: 'center' } },
                React.createElement("div", { style: {
                        width: `${cardWidth}px`,
                        borderRadius: '6px',
                        background: '#fff',
                        boxShadow: '0 0 8px 0 #ffeb73, 0 0 0 1px #fff100' ,
                        overflow: 'hidden'
                    } },
                    React.createElement("div", { style: {
                            width: `${cardWidth}px`,
                            height: `${cardWidth}px`,
                            borderRadius: '6px 6px 10px 0',
                            backgroundImage: `url(${bgImg})`,
                            backgroundSize: '100% 100%',
                            backgroundRepeat: 'no-repeat',
                            position: 'relative',
                            boxShadow: '0 0 3px 0 rgba(0,0,0,0.6)'
                        } },
                        item.faceImg && React.createElement("img", { src: item.faceImg, style: { width: '100%', height: '100%', objectFit: 'cover' } }),
                        React.createElement("div", { style: {
                                position: 'absolute',
                                right: 0,
                                bottom: 0,
                                borderRadius: '10px 0 0 0',
                                fontSize: '16px',
                                padding: '0 6px',
                                minWidth: '20px',
                                height: '22px',
                                lineHeight: '22px',
                                textAlign: 'center',
                                fontWeight: 'bold',
                                background: '#ffeb73' ,
                                color: '#6f4b00' ,
                                boxShadow: '0 0 3px 0 #6f4b00' 
                            } }, item.count)),
                    React.createElement("div", { style: {
                            fontSize: '14px',
                            lineHeight: '24px',
                            color: '#6f4b00' ,
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            padding: '0 2px'
                        } }, item.name.length > 4 ? item.name.slice(0, 4) : item.name))));
        })))));
}
function StatLi({ label, value }) {
    return (React.createElement("div", { style: { minWidth: '75px', textAlign: 'center', padding: '6px 10px', background: 'rgba(0,0,0,0.3)', borderRadius: '6px' } },
        React.createElement("div", { style: { fontSize: '18px', fontWeight: 'bold', fontFamily: FONT_NZBZ } }, value),
        React.createElement("div", { style: { fontSize: '11px', opacity: 0.6, marginTop: '2px' } }, label)));
}
function InfoNum({ label, value }) {
    return (React.createElement("div", { style: { minWidth: '50px', padding: '0 10px' } },
        React.createElement("div", { style: { color: '#ffde9d', height: '25px', lineHeight: '25px', fontSize: '22px', textShadow: '0 0 2px #000', fontFamily: FONT_NZBZ } }, value),
        React.createElement("div", { style: { fontSize: '12px', lineHeight: '14px', color: '#888' } }, label)));
}

export { GachaStatCard as default };
