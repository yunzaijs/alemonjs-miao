import React from 'react';
import HTML from './HTML.js';
import { FONT_FAMILY, FONT_NZBZ, contStyle, RARITY_COLORS } from './shared.js';

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
    return (React.createElement(HTML, { style: { width: '840px' } },
        React.createElement("div", { style: {
                width: '840px',
                fontFamily: FONT_FAMILY,
                fontSize: '16px',
                color: '#fff',
                background: '#23212d'
            } },
            React.createElement("div", { style: {
                    width: '840px',
                    padding: '5px 0 10px 5px'
                } },
                React.createElement("div", { style: { display: 'flex', width: '100%', padding: '10px 0' } },
                    React.createElement("div", { style: { width: '70%' } },
                        React.createElement("div", { style: { fontFamily: FONT_NZBZ, fontSize: '45px', paddingBottom: '10px' } }, "#\u5E7D\u5883\u5371\u6218")),
                    React.createElement("div", { style: { width: '30%', textAlign: 'right', paddingTop: '25px', paddingRight: '10px', fontSize: '25px' } },
                        "UID:",
                        data.uid)),
                React.createElement("div", { style: { padding: '0 20px', fontSize: '18px' } },
                    "\u7EDF\u8BA1\u5468\u671F\uFF1A",
                    data.schedule?.start_time,
                    " - ",
                    data.schedule?.end_time),
                !data.has_data ? (React.createElement("div", { style: contStyle() },
                    React.createElement("div", { style: { textAlign: 'center', padding: '30px 0', color: '#fff', fontSize: '14px' } }, "\u672C\u671F\u6682\u65E0\u6311\u6218\u6570\u636E"))) : (React.createElement(React.Fragment, null,
                    (data.schedule || data.best?.has_data) && (React.createElement("div", { style: { margin: '0 20px 10px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px' } },
                        React.createElement("div", { style: { display: 'flex', alignItems: 'center', padding: '5px 10px', height: '57px', justifyContent: 'space-between' } },
                            React.createElement("div", { style: { padding: '5px 10px', fontFamily: FONT_NZBZ, fontSize: '20px' } }, "\u6700\u4F73\u7EAA\u5F55"),
                            data.best?.has_data && (React.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: '10px' } },
                                React.createElement("span", { style: { fontWeight: 'bold', fontSize: '20px' } }, diffLabel),
                                React.createElement("span", { style: { fontSize: '20px' } }, formatTime(data.best.second))))))),
                    data.challs.map((chall, ci) => (React.createElement("div", { key: ci, style: contStyle() },
                        React.createElement("div", { style: { padding: '11px' } },
                            React.createElement("div", { style: {
                                    margin: '-3px 0 8px 3px',
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    justifyContent: 'space-between',
                                    color: '#d3bc8e',
                                    fontSize: '22px',
                                    fontFamily: FONT_NZBZ,
                                    fontWeight: 'normal'
                                } },
                                React.createElement("div", null, chall.name),
                                React.createElement("div", { style: { fontSize: '20px', fontFamily: FONT_FAMILY } },
                                    React.createElement("span", null, "\u6218\u6597\u7528\u65F6\uFF1A"),
                                    formatTime(chall.second))),
                            React.createElement("div", { style: { display: 'flex' } },
                                React.createElement("div", { style: { display: 'flex', marginRight: '-5px', marginLeft: '-5px', gap: '4px' } }, chall.avatars.map((a, ai) => (React.createElement("div", { key: ai, style: {
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
                                React.createElement("div", { style: { width: '1px', background: 'rgba(255,255,255,0.5)', height: '80px', margin: '15px 8px 0' } }),
                                React.createElement("div", { style: { display: 'flex', flexDirection: 'column', width: '50%' } },
                                    chall.monster && React.createElement("div", { style: { fontSize: '13px', color: '#d3bc8e', marginBottom: '6px' } },
                                        "Lv.",
                                        chall.monster.level),
                                    chall.best_avatars.length > 0 && (React.createElement("div", { style: { display: 'flex', gap: '12px', flexDirection: 'column' } },
                                        React.createElement("div", { style: { display: 'flex', gap: '10px' } },
                                            chall.best_avatars[0] && (React.createElement("div", { style: { background: '#e7e5d9', borderRadius: '10px', overflow: 'hidden', flex: 1 } },
                                                React.createElement("div", { style: { background: '#8b8b83', padding: '5px', fontSize: '18px', color: '#fff' } }, "\u6700\u5F3A\u4E00\u51FB"),
                                                React.createElement("div", { style: { padding: '5px', color: '#0d0d0d', fontSize: '20px', fontWeight: 'bold', textAlign: 'center' } }, formatDps(chall.best_avatars[0].dps)))),
                                            chall.best_avatars[1] && (React.createElement("div", { style: { background: '#e7e5d9', borderRadius: '10px', overflow: 'hidden', flex: 1 } },
                                                React.createElement("div", { style: { background: '#8b8b83', padding: '5px', fontSize: '18px', color: '#fff' } }, "\u6700\u9AD8\u603B\u4F24\u5BB3"),
                                                React.createElement("div", { style: { padding: '5px', color: '#0d0d0d', fontSize: '20px', fontWeight: 'bold', textAlign: 'center' } }, formatDps(chall.best_avatars[1].dps))))))))),
                            chall.monster?.desc && chall.monster.desc.length > 0 && (React.createElement("div", { style: { margin: '3px 0' } },
                                React.createElement("ul", { style: { listStylePosition: 'inside' } }, chall.monster.desc.map((d, di) => (React.createElement("li", { key: di, style: { fontSize: '15px' } }, d)))))))))))),
                React.createElement("div", { style: contStyle() },
                    React.createElement("div", { style: { padding: '10px 15px', fontSize: '16px' } },
                        React.createElement("div", null, "\u89D2\u8272\u88C5\u5907\u4E0E\u5723\u9057\u7269\u4E3A\u5F53\u524D\u6700\u65B0\u72B6\u6001"))),
                React.createElement("div", { style: { fontSize: '14px', textAlign: 'center', color: '#fff', textShadow: '1px 1px 1px #000', margin: '10px 0' } }, "Miao By ALemonJS")))));
}

export { HardChallengeCard as default };
