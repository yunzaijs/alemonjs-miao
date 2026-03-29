import { getGrade } from '../../model/miao/artisMark.js';
import React from 'react';
import HTML from './HTML.js';
import { FONT_FAMILY, FONT_NZBZ, ELEMENT_COLORS, contStyle, contTitleStyle, formatDateZh, rankIconStyle } from './shared.js';
import fileUrl from '../../assets/common/bg-01.jpg.js';
import fileUrl$1 from '../../assets/common/main-01.png.js';

const RANK_MEDAL = {
    1: '#ffd700',
    2: '#c0c0c0',
    3: '#cd7f32'
};
function RankRow({ entry, idx, type }) {
    const medalColor = RANK_MEDAL[entry.rank];
    const bgColor = idx % 2 === 0 ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.2)';
    let gradeInfo = null;
    if (type === 'mark') {
        gradeInfo = getGrade(entry.score / 5);
    }
    return (React.createElement("div", { style: {
            display: 'flex',
            alignItems: 'center',
            padding: '6px 14px',
            background: bgColor,
            gap: '10px'
        } },
        React.createElement("div", { style: {
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: medalColor ?? 'rgba(100,100,100,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: medalColor ? '14px' : '13px',
                fontWeight: 'bold',
                color: '#fff',
                flexShrink: 0
            } }, entry.rank),
        React.createElement("span", { style: { fontSize: '13px', color: '#fff', width: '110px', flexShrink: 0 } },
            "UID: ",
            entry.uid),
        React.createElement("div", { style: { flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '6px' } },
            React.createElement("div", { style: rankIconStyle(type === 'mark' ? 'mark' : 'dmg') }),
            React.createElement("span", { style: {
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: entry.rank <= 3 ? (RANK_MEDAL[entry.rank] ?? '#fff') : '#fff'
                } }, entry.score),
            type === 'mark' && React.createElement("span", { style: { fontSize: '12px', color: '#d3bc8e' } }, "\u5206"),
            type === 'crit' && React.createElement("span", { style: { fontSize: '12px', color: '#d3bc8e' } }, "%"),
            gradeInfo && (React.createElement("span", { style: {
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: gradeInfo.color,
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius: '3px',
                    padding: '1px 6px'
                } }, gradeInfo.grade)))));
}
const TYPE_LABELS = {
    mark: '圣遗物评分',
    crit: '双爆排名'
};
function RankListCard({ data }) {
    const { charName, charElement, type, entries, game } = data;
    const typeLabel = TYPE_LABELS[type] ?? type;
    const elemColor = charElement ? (ELEMENT_COLORS[charElement] ?? '#888') : '#e8d5b0';
    return (React.createElement(HTML, { style: { width: '550px' } },
        React.createElement("div", { style: {
                width: '550px',
                fontFamily: FONT_FAMILY,
                fontSize: '16px',
                color: '#1e1f20',
                backgroundImage: `url(${fileUrl})`,
                backgroundSize: '100% auto',
                backgroundPosition: 'left center'
            } },
            React.createElement("div", { style: {
                    width: '550px',
                    padding: '20px 15px 10px 15px',
                    backgroundImage: `url(${fileUrl$1})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center -25px'
                } },
                React.createElement("div", { style: { borderRadius: '15px', padding: '10px 20px', color: '#fff', marginTop: '10px' } },
                    React.createElement("div", { style: {
                            fontFamily: FONT_NZBZ,
                            fontSize: '36px',
                            textShadow: '0 0 1px #000, 1px 1px 3px rgba(0,0,0,0.9)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        } },
                        charName,
                        charElement && (React.createElement("span", { style: {
                                fontSize: '14px',
                                background: elemColor,
                                color: '#fff',
                                borderRadius: '4px',
                                padding: '2px 8px',
                                fontFamily: FONT_FAMILY
                            } }, charElement))),
                    React.createElement("div", { style: { fontSize: '14px', textShadow: '0 0 1px #000, 1px 1px 3px rgba(0,0,0,0.9)' } },
                        typeLabel,
                        "\u6392\u884C \u00B7 \u5171 ",
                        entries.length,
                        " \u4EBA\u53C2\u4E0E")),
                React.createElement("div", { style: contStyle() },
                    React.createElement("div", { style: contTitleStyle() }, "\u7FA4\u5185\u6392\u540D"),
                    entries.length > 0 ? (entries.map((entry, idx) => React.createElement(RankRow, { key: entry.uid, entry: entry, idx: idx, type: type }))) : (React.createElement("div", { style: { width: '100%', textAlign: 'center', padding: '40px 0', color: '#fff', fontSize: '14px' } }, "\u6682\u65E0\u6392\u540D\u6570\u636E\uFF0C\u8BF7\u5148\u4F7F\u7528 #\u66F4\u65B0\u9762\u677F \u63D0\u4EA4\u6570\u636E"))),
                React.createElement("div", { style: {
                        display: 'flex',
                        background: 'rgba(0,0,0,0.4)',
                        width: '100%',
                        padding: '10px 15px',
                        fontSize: '12px',
                        color: '#fff',
                        borderRadius: '0 0 10px 10px',
                        margin: '5px 10px'
                    } },
                    React.createElement("span", { style: { width: '50%' } },
                        "\u6570\u636E\u6765\u6E90: ",
                        game === 'sr' ? 'Mihomo' : 'Enka Network'),
                    React.createElement("span", { style: { width: '50%', textAlign: 'right' } }, formatDateZh())),
                React.createElement("div", { style: { fontSize: '14px', textAlign: 'center', color: '#fff', textShadow: '1px 1px 1px #000', margin: '10px 0' } }, " AlemonJS")))));
}

export { RankListCard as default };
