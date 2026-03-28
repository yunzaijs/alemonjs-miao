import React from 'react';
import HTML from './HTML.js';
import { formatDate, FONT_FAMILY, RARITY_COLORS } from './shared.js';

const DIFFICULTY_NAMES = {
    1: '普通',
    2: '进阶',
    3: '困难',
    4: '险恶',
    5: '无畏',
    6: '绝境'
};
const DIFFICULTY_ROMAN = {
    1: 'I',
    2: 'II',
    3: 'III',
    4: 'IV',
    5: 'V',
    6: 'VI'
};
function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    if (m > 0) {
        return `${m}分${s}秒`;
    }
    return `${s}秒`;
}
function formatDps(dps) {
    if (dps >= 10000) {
        return `${(dps / 10000).toFixed(1)}万`;
    }
    return String(dps);
}
function HardChallengeCard({ data }) {
    const dateStr = formatDate();
    const diff = data.best?.difficulty ?? 0;
    const diffLabel = diff > 0 ? `${DIFFICULTY_ROMAN[diff] ?? diff} · ${DIFFICULTY_NAMES[diff] ?? '未知'}` : '未挑战';
    return (React.createElement(HTML, { style: { width: '700px' } },
        React.createElement("div", { style: {
                padding: '24px',
                background: 'linear-gradient(180deg, #1a1520 0%, #2d2435 40%)',
                fontFamily: FONT_FAMILY,
                fontSize: '14px',
                color: '#e8e0f0'
            } },
            React.createElement("div", { style: {
                    background: 'linear-gradient(135deg, #6a3fa0, #4a2b75)',
                    borderRadius: '14px 14px 0 0',
                    padding: '14px 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                } },
                React.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: '8px' } },
                    React.createElement("span", { style: { fontSize: '18px', fontWeight: 'bold', color: '#e8d5f5' } }, "\u5E7D\u5883\u5371\u6218"),
                    React.createElement("span", { style: {
                            fontSize: '12px',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            background: 'rgba(255,255,255,0.15)',
                            color: '#d4bfef'
                        } }, diffLabel)),
                React.createElement("span", { style: { fontSize: '13px', color: '#b8a0d0' } },
                    "UID ",
                    data.uid)),
            React.createElement("div", { style: {
                    background: 'rgba(30, 25, 40, 0.9)',
                    borderRadius: '0 0 14px 14px',
                    padding: '16px 20px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                } }, !data.has_data ? (React.createElement("div", { style: { textAlign: 'center', padding: '20px 0', color: '#8a7a9e', fontSize: '14px' } }, "\u672C\u671F\u6682\u65E0\u6311\u6218\u6570\u636E")) : (React.createElement(React.Fragment, null,
                data.schedule && (React.createElement("div", { style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '8px 0',
                        borderBottom: '1px solid rgba(255,255,255,0.08)',
                        color: '#a090b8',
                        fontSize: '13px'
                    } },
                    React.createElement("span", null, "\u5468\u671F"),
                    React.createElement("span", null,
                        data.schedule.start_time,
                        " ~ ",
                        data.schedule.end_time))),
                data.best?.has_data && (React.createElement("div", { style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '8px 0',
                        borderBottom: '1px solid rgba(255,255,255,0.08)'
                    } },
                    React.createElement("span", { style: { color: '#a090b8', fontSize: '13px' } }, "\u6700\u4F73\u7528\u65F6"),
                    React.createElement("span", { style: { fontWeight: 'bold' } }, formatTime(data.best.second)))),
                data.challs.map((chall, ci) => (React.createElement("div", { key: ci, style: {
                        marginTop: '12px',
                        padding: '12px',
                        background: 'rgba(255,255,255,0.04)',
                        borderRadius: '8px',
                        border: '1px solid rgba(255,255,255,0.06)'
                    } },
                    React.createElement("div", { style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '8px'
                        } },
                        React.createElement("span", { style: { fontWeight: 'bold', fontSize: '14px', color: '#d4bfef' } }, chall.name),
                        React.createElement("span", { style: { fontSize: '12px', color: '#8a7a9e' } },
                            "\u7528\u65F6 ",
                            formatTime(chall.second))),
                    chall.monster && (React.createElement("div", { style: {
                            fontSize: '12px',
                            color: '#8a7a9e',
                            marginBottom: '6px'
                        } },
                        "Lv.",
                        chall.monster.level)),
                    React.createElement("div", { style: { display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' } }, chall.avatars.map((a, ai) => (React.createElement("span", { key: ai, style: {
                            fontSize: '12px',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            background: 'rgba(255,255,255,0.08)',
                            color: RARITY_COLORS[a.rarity] ?? '#e8e0f0'
                        } },
                        a.name,
                        " Lv.",
                        a.level,
                        a.rank > 0 && React.createElement("span", { style: { fontSize: '10px', color: '#8a7a9e', marginLeft: '2px' } },
                            "C",
                            a.rank))))),
                    chall.best_avatars.length > 0 && (React.createElement("div", { style: { display: 'flex', gap: '12px', fontSize: '12px' } },
                        chall.best_avatars[0] && React.createElement("span", { style: { color: '#e8a040' } },
                            "\u6700\u5F3A\u4E00\u51FB: ",
                            formatDps(chall.best_avatars[0].dps)),
                        chall.best_avatars[1] && React.createElement("span", { style: { color: '#60b0e0' } },
                            "\u6700\u9AD8\u603B\u4F24\u5BB3: ",
                            formatDps(chall.best_avatars[1].dps)))))))))),
            React.createElement("div", { style: { textAlign: 'right', padding: '8px 4px 0', fontSize: '11px', color: '#6a5a80' } }, dateStr))));
}

export { HardChallengeCard as default };
