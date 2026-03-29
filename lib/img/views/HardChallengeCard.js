import React from 'react';
import HTML from './HTML.js';
import { FONT_FAMILY, FONT_NZBZ, contStyle, contTitleStyle, RARITY_COLORS, formatDateZh } from './shared.js';
import fileUrl from '../../assets/common/bg-01.jpg.js';
import fileUrl$1 from '../../assets/common/main-01.png.js';

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
    const diff = data.best?.difficulty ?? 0;
    const diffLabel = diff > 0 ? `${DIFFICULTY_ROMAN[diff] ?? diff} · ${DIFFICULTY_NAMES[diff] ?? '未知'}` : '未挑战';
    return (React.createElement(HTML, { style: { width: '700px' } },
        React.createElement("div", { style: {
                width: '700px',
                fontFamily: FONT_FAMILY,
                fontSize: '16px',
                color: '#1e1f20',
                backgroundImage: `url(${fileUrl})`,
                backgroundSize: '100% auto',
                backgroundPosition: 'left center'
            } },
            React.createElement("div", { style: {
                    width: '700px',
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
                            textShadow: '0 0 1px #000, 1px 1px 3px rgba(0,0,0,0.9)'
                        } },
                        "\u5E7D\u5883\u5371\u6218",
                        React.createElement("span", { style: {
                                display: 'inline-block',
                                marginLeft: '10px',
                                fontSize: '16px',
                                fontFamily: FONT_FAMILY,
                                textShadow: '0 0 1px #000, 1px 1px 3px rgba(0,0,0,0.9)'
                            } },
                            "UID:",
                            data.uid,
                            " \u00B7 ",
                            diffLabel))),
                !data.has_data ? (React.createElement("div", { style: contStyle() },
                    React.createElement("div", { style: { textAlign: 'center', padding: '30px 0', color: '#fff', fontSize: '14px' } }, "\u672C\u671F\u6682\u65E0\u6311\u6218\u6570\u636E"))) : (React.createElement(React.Fragment, null,
                    (data.schedule || data.best?.has_data) && (React.createElement("div", { style: contStyle() },
                        React.createElement("div", { style: contTitleStyle() }, "\u603B\u89C8"),
                        React.createElement("div", { style: { padding: '8px 15px' } },
                            data.schedule && (React.createElement("div", { style: {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '6px 0',
                                    color: '#fff',
                                    fontSize: '14px',
                                    borderBottom: '1px solid rgba(255,255,255,0.1)'
                                } },
                                React.createElement("span", { style: { color: '#d3bc8e' } }, "\u5468\u671F"),
                                React.createElement("span", null,
                                    data.schedule.start_time,
                                    " ~ ",
                                    data.schedule.end_time))),
                            data.best?.has_data && (React.createElement("div", { style: { display: 'flex', justifyContent: 'space-between', padding: '6px 0', color: '#fff', fontSize: '14px' } },
                                React.createElement("span", { style: { color: '#d3bc8e' } }, "\u6700\u4F73\u7528\u65F6"),
                                React.createElement("span", { style: { fontWeight: 'bold' } }, formatTime(data.best.second))))))),
                    data.challs.map((chall, ci) => (React.createElement("div", { key: ci, style: contStyle() },
                        React.createElement("div", { style: contTitleStyle({ display: 'flex', justifyContent: 'space-between' }) },
                            React.createElement("span", null, chall.name),
                            React.createElement("span", { style: { fontWeight: 'normal', fontSize: '13px' } },
                                "\u7528\u65F6 ",
                                formatTime(chall.second))),
                        React.createElement("div", { style: { padding: '8px 15px' } },
                            chall.monster && React.createElement("div", { style: { fontSize: '13px', color: '#d3bc8e', marginBottom: '6px' } },
                                "Lv.",
                                chall.monster.level),
                            React.createElement("div", { style: { display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' } }, chall.avatars.map((a, ai) => (React.createElement("span", { key: ai, style: {
                                    fontSize: '13px',
                                    padding: '3px 10px',
                                    borderRadius: '4px',
                                    background: 'rgba(0,0,0,0.3)',
                                    color: RARITY_COLORS[a.rarity] ?? '#fff'
                                } },
                                a.name,
                                " Lv.",
                                a.level,
                                a.rank > 0 && React.createElement("span", { style: { fontSize: '11px', color: '#d3bc8e', marginLeft: '2px' } },
                                    "C",
                                    a.rank))))),
                            chall.best_avatars.length > 0 && (React.createElement("div", { style: { display: 'flex', gap: '12px', fontSize: '13px' } },
                                chall.best_avatars[0] && React.createElement("span", { style: { color: '#e8a040' } },
                                    "\u6700\u5F3A\u4E00\u51FB: ",
                                    formatDps(chall.best_avatars[0].dps)),
                                chall.best_avatars[1] && React.createElement("span", { style: { color: '#60b0e0' } },
                                    "\u6700\u9AD8\u603B\u4F24\u5BB3: ",
                                    formatDps(chall.best_avatars[1].dps)))))))))),
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
                    React.createElement("span", { style: { width: '50%' } }, "\u6570\u636E\u6765\u6E90: \u7C73\u6E38\u793E"),
                    React.createElement("span", { style: { width: '50%', textAlign: 'right' } }, formatDateZh())),
                React.createElement("div", { style: { fontSize: '14px', textAlign: 'center', color: '#fff', textShadow: '1px 1px 1px #000', margin: '10px 0' } }, " AlemonJS")))));
}

export { HardChallengeCard as default };
