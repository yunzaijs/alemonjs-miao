import React from 'react';
import HTML from './HTML.js';
import { FONT_FAMILY, FONT_NZBZ, contStyle, contTitleStyle, formatDateZh } from './shared.js';
import fileUrl from '../../assets/common/bg-01.jpg.js';
import fileUrl$1 from '../../assets/common/main-01.png.js';

const TYPE_LABELS = {
    character: '角色卡池',
    weapon: '武器卡池',
    abyss: '深渊/挑战',
    pass: '纪行/战令',
    activity: '限时活动',
    other: '其他'
};
function ActivityItem({ item }) {
    const activeBg = item.isActive ? 'rgba(76,175,80,0.15)' : 'rgba(0,0,0,0.15)';
    return (React.createElement("div", { style: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 14px',
            background: activeBg,
            borderRadius: '4px',
            marginBottom: '2px'
        } },
        React.createElement("div", { style: {
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: item.isActive ? '#4caf50' : '#ff9800',
                flexShrink: 0
            } }),
        React.createElement("div", { style: { display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 } },
            React.createElement("span", { style: {
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#fff',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                } }, item.title),
            React.createElement("div", { style: { display: 'flex', gap: '8px', marginTop: '3px', flexWrap: 'wrap' } },
                React.createElement("span", { style: { fontSize: '12px', color: '#d3bc8e' } }, TYPE_LABELS[item.type] ?? '其他'),
                React.createElement("span", { style: { fontSize: '12px', color: item.isActive ? '#81c784' : '#ffb74d' } }, item.remaining)))));
}
function CalendarCard({ data }) {
    const activeItems = data.activities.filter(a => a.isActive);
    const upcomingItems = data.activities.filter(a => !a.isActive);
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
                            textShadow: '0 0 1px #000, 1px 1px 3px rgba(0,0,0,0.9)'
                        } },
                        data.gameName,
                        "\u65E5\u5386"),
                    React.createElement("div", { style: { fontSize: '14px', textShadow: '0 0 1px #000, 1px 1px 3px rgba(0,0,0,0.9)' } }, data.now)),
                activeItems.length > 0 && (React.createElement("div", { style: contStyle() },
                    React.createElement("div", { style: contTitleStyle() },
                        "\u8FDB\u884C\u4E2D (",
                        activeItems.length,
                        ")"),
                    React.createElement("div", { style: { padding: '8px 10px' } }, activeItems.map(item => (React.createElement(ActivityItem, { key: item.id, item: item })))))),
                upcomingItems.length > 0 && (React.createElement("div", { style: contStyle() },
                    React.createElement("div", { style: contTitleStyle() },
                        "\u5373\u5C06\u5F00\u59CB (",
                        upcomingItems.length,
                        ")"),
                    React.createElement("div", { style: { padding: '8px 10px' } }, upcomingItems.map(item => (React.createElement(ActivityItem, { key: item.id, item: item })))))),
                data.activities.length === 0 && (React.createElement("div", { style: contStyle() },
                    React.createElement("div", { style: { width: '100%', textAlign: 'center', padding: '40px 0', color: '#fff', fontSize: '14px' } }, "\u6682\u65E0\u6D3B\u52A8\u6570\u636E"))),
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
                    React.createElement("span", { style: { width: '50%' } }, "\u6570\u636E\u6765\u81EA\u7C73\u6E38\u793E\u516C\u544A"),
                    React.createElement("span", { style: { width: '50%', textAlign: 'right' } }, formatDateZh())),
                React.createElement("div", { style: { fontSize: '14px', textAlign: 'center', color: '#fff', textShadow: '1px 1px 1px #000', margin: '10px 0' } }, " AlemonJS")))));
}

export { CalendarCard as default };
