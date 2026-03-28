import React from 'react';
import HTML from './HTML.js';
import { GAME_ACCENT, FONT_FAMILY, DARK_BG } from './shared.js';

const TYPE_ICONS = {
    character: '🎭',
    weapon: '🗡️',
    abyss: '⚔️',
    pass: '📜',
    activity: '🎉',
    other: '📋'
};
const TYPE_LABELS = {
    character: '角色卡池',
    weapon: '武器卡池',
    abyss: '深渊/挑战',
    pass: '纪行/战令',
    activity: '限时活动',
    other: '其他'
};
function ActivityItem({ item }) {
    const activeBg = item.isActive ? 'rgba(76,175,80,0.12)' : 'rgba(255,255,255,0.04)';
    const activeBorder = item.isActive ? '1px solid rgba(76,175,80,0.25)' : '1px solid rgba(255,255,255,0.06)';
    return (React.createElement("div", { style: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 14px',
            background: activeBg,
            borderRadius: '6px',
            border: activeBorder
        } },
        React.createElement("span", { style: { fontSize: '18px', flexShrink: 0 } }, TYPE_ICONS[item.type] ?? '📋'),
        React.createElement("div", { style: { display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 } },
            React.createElement("span", { style: {
                    fontSize: '13px',
                    fontWeight: 'bold',
                    color: '#eee',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                } }, item.title),
            React.createElement("div", { style: { display: 'flex', gap: '8px', marginTop: '3px', flexWrap: 'wrap' } },
                React.createElement("span", { style: { fontSize: '11px', color: '#888' } }, TYPE_LABELS[item.type] ?? '其他'),
                React.createElement("span", { style: { fontSize: '11px', color: item.isActive ? '#81c784' : '#ffb74d' } }, item.remaining))),
        React.createElement("div", { style: {
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: item.isActive ? '#4caf50' : '#bdbdbd',
                flexShrink: 0
            } })));
}
function CalendarCard({ data }) {
    const accent = GAME_ACCENT[data.game] ?? GAME_ACCENT.gs;
    const activeItems = data.activities.filter(a => a.isActive);
    const upcomingItems = data.activities.filter(a => !a.isActive);
    return (React.createElement(HTML, { style: { width: '520px' } },
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
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                } },
                React.createElement("span", { style: { fontSize: '28px' } }, "\uD83D\uDCC5"),
                React.createElement("div", { style: { display: 'flex', flexDirection: 'column' } },
                    React.createElement("span", { style: {
                            fontSize: '22px',
                            fontWeight: 'bold',
                            color: '#fff',
                            textShadow: '0 0 6px rgba(255,255,255,0.3)'
                        } },
                        data.gameName,
                        "\u65E5\u5386"),
                    React.createElement("span", { style: { fontSize: '12px', color: '#999', marginTop: '2px' } }, data.now))),
            React.createElement("div", { style: { padding: '14px 24px' } },
                activeItems.length > 0 && (React.createElement("div", { style: { marginBottom: '16px' } },
                    React.createElement("div", { style: {
                            fontSize: '13px',
                            fontWeight: 'bold',
                            color: accent,
                            marginBottom: '8px',
                            paddingBottom: '4px',
                            borderBottom: `1px solid ${accent}33`,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        } },
                        React.createElement("span", { style: {
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                background: '#4caf50',
                                display: 'inline-block'
                            } }),
                        "\u8FDB\u884C\u4E2D (",
                        activeItems.length,
                        ")"),
                    React.createElement("div", { style: { display: 'flex', flexDirection: 'column', gap: '6px' } }, activeItems.map(item => (React.createElement(ActivityItem, { key: item.id, item: item })))))),
                upcomingItems.length > 0 && (React.createElement("div", null,
                    React.createElement("div", { style: {
                            fontSize: '13px',
                            fontWeight: 'bold',
                            color: accent,
                            marginBottom: '8px',
                            paddingBottom: '4px',
                            borderBottom: `1px solid ${accent}33`,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        } },
                        React.createElement("span", { style: {
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                background: '#ff9800',
                                display: 'inline-block'
                            } }),
                        "\u5373\u5C06\u5F00\u59CB (",
                        upcomingItems.length,
                        ")"),
                    React.createElement("div", { style: { display: 'flex', flexDirection: 'column', gap: '6px' } }, upcomingItems.map(item => (React.createElement(ActivityItem, { key: item.id, item: item })))))),
                data.activities.length === 0 && (React.createElement("div", { style: {
                        textAlign: 'center',
                        padding: '40px 0',
                        color: '#666',
                        fontSize: '14px'
                    } }, "\u6682\u65E0\u6D3B\u52A8\u6570\u636E"))),
            React.createElement("div", { style: {
                    padding: '10px 24px 16px',
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                    fontSize: '11px',
                    color: '#777',
                    textAlign: 'center'
                } },
                "\u6570\u636E\u6765\u81EA\u7C73\u6E38\u793E\u516C\u544A \u00B7 ",
                data.now))));
}

export { CalendarCard as default };
