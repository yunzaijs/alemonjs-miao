import React from 'react';
import HTML from './HTML.js';
import { FONT_FAMILY, FONT_NZBZ, contStyle, RARITY_COLORS, contTitleStyle } from './shared.js';

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
    return (React.createElement(HTML, { style: { width: '970px' } },
        React.createElement("div", { style: {
                width: '970px',
                fontFamily: FONT_FAMILY,
                fontSize: '16px',
                color: '#fff',
                background: '#151214'
            } },
            React.createElement("div", { style: {
                    width: '970px',
                    padding: '5px 0 10px 5px'
                } },
                React.createElement("div", { style: { display: 'flex', width: '100%', padding: '10px 0' } },
                    React.createElement("div", { style: { width: '70%' } },
                        React.createElement("div", { style: { fontFamily: FONT_NZBZ, fontSize: '45px', paddingBottom: '10px' } },
                            "#\u5E7B\u60F3\u771F\u5883\u5267\u8BD7",
                            stat && (React.createElement("span", { style: { fontSize: '30px', marginLeft: '10px', color: '#d3bc8e' } }, schedule ? `${schedule.start_date_time.month}月` : '')))),
                    React.createElement("div", { style: { width: '30%', textAlign: 'right', paddingTop: '25px', paddingRight: '10px', fontSize: '25px' } },
                        "UID:",
                        data.uid)),
                noData ? (React.createElement("div", { style: contStyle() },
                    React.createElement("div", { style: { textAlign: 'center', padding: '30px 0', color: '#fff', fontSize: '14px' } }, "\u672C\u671F\u6682\u65E0\u6311\u6218\u6570\u636E"))) : noDetail ? (React.createElement("div", { style: contStyle() },
                    React.createElement("div", { style: { textAlign: 'center', padding: '30px 0', color: '#fff', fontSize: '14px' } }, "\u6570\u636E\u8FD8\u6CA1\u66F4\u65B0\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5"))) : (React.createElement(React.Fragment, null,
                    React.createElement("div", { style: { width: '100%', padding: '40px 80px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px', margin: '10px 0' } },
                        React.createElement("div", { style: { color: '#d3bc8e', fontSize: '43px', lineHeight: '35px', textAlign: 'center', fontFamily: FONT_NZBZ, marginBottom: '30px' } }, "\u6F14\u51FA\u56DE\u987E"),
                        React.createElement("div", { style: { display: 'flex', flexDirection: 'column', color: '#ccc', margin: '30px 25px 0' } },
                            schedule && (React.createElement("div", { style: { display: 'flex', width: '100%', height: '76px', alignItems: 'center', fontSize: '26px' } },
                                React.createElement("div", { style: { width: '50%' } }, "\u5468\u671F"),
                                React.createElement("div", { style: { width: '100%', fontSize: '26px', display: 'flex', justifyContent: 'flex-end' } },
                                    schedule.start_date_time.month,
                                    "/",
                                    schedule.start_date_time.day,
                                    " ~ ",
                                    schedule.end_date_time.month,
                                    "/",
                                    schedule.end_date_time.day))),
                            stat && (React.createElement(React.Fragment, null,
                                React.createElement("div", { style: { display: 'flex', width: '100%', height: '76px', alignItems: 'center', fontSize: '26px' } },
                                    React.createElement("div", { style: { width: '50%' } }, "\u6700\u6DF1\u5E55\u6570"),
                                    React.createElement("div", { style: { width: '100%', display: 'flex', justifyContent: 'flex-end' } },
                                        "\u7B2C",
                                        stat.max_round_id,
                                        "\u5E55")),
                                React.createElement("div", { style: { display: 'flex', width: '100%', height: '76px', alignItems: 'center', fontSize: '26px' } },
                                    React.createElement("div", { style: { width: '50%' } }, "\u5F02\u7AEF\u503C"),
                                    React.createElement("div", { style: { width: '100%', display: 'flex', justifyContent: 'flex-end' } }, stat.heresy_count)),
                                React.createElement("div", { style: { display: 'flex', width: '100%', height: '76px', alignItems: 'center', fontSize: '26px' } },
                                    React.createElement("div", { style: { width: '50%' } }, "\u6D88\u8017\u5E7B\u5267\u4E4B\u82B1"),
                                    React.createElement("div", { style: { width: '100%', display: 'flex', justifyContent: 'flex-end' } }, stat.coin_num)),
                                React.createElement("div", { style: { display: 'flex', width: '100%', height: '76px', alignItems: 'center', fontSize: '26px' } },
                                    React.createElement("div", { style: { width: '50%' } }, "\u573A\u5916\u89C2\u4F17\u58F0\u63F4"),
                                    React.createElement("div", { style: { width: '100%', display: 'flex', justifyContent: 'flex-end' } },
                                        stat.avatar_bonus_num,
                                        " \u6B21")),
                                React.createElement("div", { style: { display: 'flex', width: '100%', height: '76px', alignItems: 'center', fontSize: '26px' } },
                                    React.createElement("div", { style: { width: '50%' } }, "\u652F\u63F4\u5176\u4ED6\u73A9\u5BB6"),
                                    React.createElement("div", { style: { width: '100%', display: 'flex', justifyContent: 'flex-end' } },
                                        stat.rent_cnt,
                                        " \u6B21")))))),
                    detail &&
                        detail.rounds_data.length > 0 &&
                        detail.rounds_data.map((round, ri) => (React.createElement("div", { key: ri, style: contStyle() },
                            React.createElement("div", { style: { padding: '11px' } },
                                React.createElement("div", { style: { margin: '-3px 0 8px', display: 'flex', alignItems: 'flex-end' } },
                                    round.is_get_medal && React.createElement("span", { style: { fontSize: '14px', color: '#c6923a', marginRight: '4px' } }, "\u2726"),
                                    React.createElement("strong", { style: { marginLeft: '3px', color: '#d3bc8e', fontSize: '18px', fontFamily: FONT_NZBZ, fontWeight: 'normal', marginRight: '10px' } },
                                        "\u7B2C",
                                        round.round_id,
                                        "\u5E55")),
                                React.createElement("div", { style: { display: 'flex', gap: '10px' } },
                                    React.createElement("div", { style: { display: 'flex', flexWrap: 'wrap', gap: '4px' } }, round.avatars.map((a, ai) => (React.createElement("span", { key: ai, style: {
                                            fontSize: '13px',
                                            padding: '3px 10px',
                                            borderRadius: '4px',
                                            background: 'rgba(0,0,0,0.3)',
                                            color: RARITY_COLORS[a.rarity] ?? '#fff'
                                        } },
                                        a.name,
                                        " Lv.",
                                        a.level))))))))),
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
                React.createElement("div", { style: contStyle() },
                    React.createElement("div", { style: { padding: '10px 15px', fontSize: '16px' } },
                        React.createElement("div", null, "\u5404\u5173\u5361\u6309\u7167\u6311\u6218\u65F6\u95F4\u987A\u5E8F\u5C55\u793A"),
                        React.createElement("div", null, "\u89D2\u8272\u88C5\u5907\u4E0E\u5723\u9057\u7269\u4E3A\u5F53\u524D\u6700\u65B0\u72B6\u6001"))),
                React.createElement("div", { style: { fontSize: '14px', textAlign: 'center', color: '#fff', textShadow: '1px 1px 1px #000', margin: '10px 0' } }, "Miao By ALemonJS")))));
}

export { RoleCombatCard as default };
