import React from 'react';
import HTML from './HTML.js';
import { FONT_FAMILY, FONT_NZBZ, contStyle, contTitleStyle, RARITY_COLORS, formatDateZh } from './shared.js';
import fileUrl from '../../assets/common/bg-01.jpg.js';
import fileUrl$1 from '../../assets/common/main-01.png.js';

function StatRow({ label, value }) {
    return (React.createElement("div", { style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '6px 0',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            color: '#fff',
            fontSize: '14px'
        } },
        React.createElement("span", { style: { color: '#d3bc8e' } }, label),
        React.createElement("span", { style: { fontWeight: 'bold' } }, value)));
}
function RoleCombatCard({ data }) {
    const noData = !data.has_data || data.data.length === 0;
    const noDetail = data.has_data && !data.has_detail_data;
    let schedule;
    let stat;
    let detail;
    if (!noData) {
        schedule = data.data[0].schedule;
        stat = data.data[0].stat;
        detail = data.data[0].detail;
    }
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
                        "\u5E7B\u60F3\u771F\u5883\u5267\u8BD7",
                        React.createElement("span", { style: {
                                display: 'inline-block',
                                marginLeft: '10px',
                                fontSize: '16px',
                                fontFamily: FONT_FAMILY,
                                textShadow: '0 0 1px #000, 1px 1px 3px rgba(0,0,0,0.9)'
                            } },
                            "UID:",
                            data.uid))),
                noData ? (React.createElement("div", { style: contStyle() },
                    React.createElement("div", { style: { textAlign: 'center', padding: '30px 0', color: '#fff', fontSize: '14px' } }, "\u672C\u671F\u6682\u65E0\u6311\u6218\u6570\u636E"))) : noDetail ? (React.createElement("div", { style: contStyle() },
                    React.createElement("div", { style: { textAlign: 'center', padding: '30px 0', color: '#fff', fontSize: '14px' } }, "\u6570\u636E\u8FD8\u6CA1\u66F4\u65B0\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5"))) : (React.createElement(React.Fragment, null,
                    React.createElement("div", { style: contStyle() },
                        React.createElement("div", { style: contTitleStyle() }, "\u6311\u6218\u7EDF\u8BA1"),
                        React.createElement("div", { style: { padding: '8px 15px' } },
                            schedule && (React.createElement(StatRow, { label: '\u5468\u671F', value: `${schedule.start_date_time.month}/${schedule.start_date_time.day}` + ` ~ ${schedule.end_date_time.month}/${schedule.end_date_time.day}` })),
                            stat && (React.createElement(React.Fragment, null,
                                React.createElement(StatRow, { label: '\u6700\u6DF1\u5E55\u6570', value: `第${stat.max_round_id}幕` }),
                                React.createElement(StatRow, { label: '\u5F02\u7AEF\u503C', value: stat.heresy_count }),
                                React.createElement(StatRow, { label: '\u83B7\u53D6\u91D1\u5E01', value: stat.coin_num }),
                                React.createElement(StatRow, { label: '\u52A9\u6218\u6B21\u6570', value: `${stat.rent_cnt}次` }))))),
                    detail && detail.rounds_data.length > 0 && (React.createElement("div", { style: contStyle() },
                        React.createElement("div", { style: contTitleStyle() }, "\u5404\u5E55\u9635\u5BB9"),
                        React.createElement("div", { style: { padding: '8px 15px' } }, detail.rounds_data.map((round, ri) => (React.createElement("div", { key: ri, style: { padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' } },
                            React.createElement("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' } },
                                React.createElement("span", { style: { fontSize: '14px', fontWeight: 'bold', color: '#d3bc8e' } },
                                    "\u7B2C",
                                    round.round_id,
                                    "\u5E55"),
                                round.is_get_medal && React.createElement("span", { style: { fontSize: '14px', color: '#c6923a' } }, "\u2726 \u52CB\u7AE0")),
                            React.createElement("div", { style: { display: 'flex', flexWrap: 'wrap', gap: '4px' } }, round.avatars.map((a, ai) => (React.createElement("span", { key: ai, style: {
                                    fontSize: '13px',
                                    padding: '3px 10px',
                                    borderRadius: '4px',
                                    background: 'rgba(0,0,0,0.3)',
                                    color: RARITY_COLORS[a.rarity] ?? '#fff'
                                } },
                                a.name,
                                " Lv.",
                                a.level)))))))))),
                    detail && detail.backup_avatars.length > 0 && (React.createElement("div", { style: contStyle() },
                        React.createElement("div", { style: contTitleStyle() }, "\u5019\u9009\u89D2\u8272"),
                        React.createElement("div", { style: { display: 'flex', flexWrap: 'wrap', gap: '4px', padding: '10px 15px' } }, detail.backup_avatars.map((a, ai) => (React.createElement("span", { key: ai, style: {
                                fontSize: '13px',
                                padding: '3px 10px',
                                borderRadius: '4px',
                                background: 'rgba(0,0,0,0.3)',
                                color: RARITY_COLORS[a.rarity] ?? '#fff'
                            } },
                            a.name,
                            " Lv.",
                            a.level)))))))),
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

export { RoleCombatCard as default };
