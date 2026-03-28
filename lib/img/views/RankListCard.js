import { getGrade } from '../../model/miao/artisMark.js';
import React from 'react';
import HTML from './HTML.js';
import { FONT_FAMILY, DARK_BG, ELEMENT_COLORS, formatDateZh } from './shared.js';

const RANK_MEDAL = {
    1: '#ffd700',
    2: '#c0c0c0',
    3: '#cd7f32'
};
function RankRow({ entry, idx, type }) {
    const medalColor = RANK_MEDAL[entry.rank];
    const bgColor = medalColor ? `linear-gradient(90deg, ${medalColor}18, transparent)` : idx % 2 === 0 ? 'rgba(0,0,0,0.2)' : 'rgba(50,50,50,0.4)';
    let gradeInfo = null;
    if (type === 'mark') {
        gradeInfo = getGrade(entry.score / 5);
    }
    return (React.createElement("div", { style: {
            display: 'flex',
            alignItems: 'center',
            padding: '8px 14px',
            background: bgColor,
            borderRadius: '4px',
            marginBottom: '2px',
            gap: '12px'
        } },
        React.createElement("div", { style: {
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: medalColor ?? 'rgba(100,100,100,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: medalColor ? '16px' : '14px',
                fontWeight: 'bold',
                color: medalColor ? '#fff' : '#aaa',
                flexShrink: 0
            } }, entry.rank),
        React.createElement("span", { style: {
                fontSize: '13px',
                color: '#ccc',
                width: '120px',
                flexShrink: 0
            } },
            "UID: ",
            entry.uid),
        React.createElement("div", { style: { flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px' } },
            React.createElement("span", { style: {
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: entry.rank <= 3 ? (RANK_MEDAL[entry.rank] ?? '#fff') : '#fff'
                } }, entry.score),
            type === 'mark' && React.createElement("span", { style: { fontSize: '12px', color: '#aaa' } }, "\u5206"),
            type === 'crit' && React.createElement("span", { style: { fontSize: '12px', color: '#aaa' } }, "%"),
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
                padding: '0',
                background: DARK_BG,
                fontFamily: FONT_FAMILY,
                fontSize: '14px',
                color: '#eee',
                minHeight: '300px'
            } },
            React.createElement("div", { style: {
                    padding: '20px 24px 14px',
                    borderBottom: '1px solid rgba(255,255,255,0.1)'
                } },
                React.createElement("div", { style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    } },
                    React.createElement("span", { style: {
                            fontSize: '22px',
                            fontWeight: 'bold',
                            color: '#fff',
                            textShadow: '0 0 6px rgba(255,255,255,0.3)'
                        } }, charName),
                    charElement && (React.createElement("span", { style: {
                            fontSize: '11px',
                            background: elemColor,
                            color: '#fff',
                            borderRadius: '4px',
                            padding: '2px 8px',
                            fontWeight: 'bold'
                        } }, charElement)),
                    React.createElement("span", { style: {
                            fontSize: '13px',
                            color: '#aaa',
                            marginLeft: 'auto'
                        } },
                        typeLabel,
                        "\u6392\u884C")),
                React.createElement("div", { style: {
                        fontSize: '12px',
                        color: '#999',
                        marginTop: '6px'
                    } },
                    "\u7FA4\u5185\u6392\u540D \u00B7 \u5171 ",
                    entries.length,
                    " \u4EBA\u53C2\u4E0E")),
            React.createElement("div", { style: { padding: '14px 20px' } }, entries.length > 0 ? (entries.map((entry, idx) => React.createElement(RankRow, { key: entry.uid, entry: entry, idx: idx, type: type }))) : (React.createElement("div", { style: {
                    width: '100%',
                    textAlign: 'center',
                    padding: '40px 0',
                    color: '#666',
                    fontSize: '14px'
                } }, "\u6682\u65E0\u6392\u540D\u6570\u636E\uFF0C\u8BF7\u5148\u4F7F\u7528 #\u66F4\u65B0\u9762\u677F \u63D0\u4EA4\u6570\u636E"))),
            React.createElement("div", { style: {
                    padding: '10px 24px 16px',
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '11px',
                    color: '#666'
                } },
                React.createElement("span", null,
                    "\u6570\u636E\u6765\u6E90: ",
                    game === 'sr' ? 'Mihomo' : 'Enka Network'),
                React.createElement("span", null, formatDateZh())))));
}

export { RankListCard as default };
