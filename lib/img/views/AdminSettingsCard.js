import React from 'react';
import HTML from './HTML.js';
import { elemBgUrl, FONT_FAMILY, FONT_NZBZ, contStyle, contTitleStyle } from './shared.js';

const SETTING_GROUPS = {
    profile: {
        title: '面板设置',
        items: [
            { key: 'profileApi', label: '面板数据源', desc: '面板服务API来源 (enka/miao)' },
            { key: 'profileCache', label: '面板缓存', desc: '缓存面板数据的时间 (分钟)' },
            { key: 'profileDmg', label: '面板伤害', desc: '面板详情是否显示伤害模拟' }
        ]
    },
    rank: {
        title: '排行设置',
        items: [
            { key: 'rankEnable', label: '排行开关', desc: '是否启用群内排行功能' },
            { key: 'rankLimit', label: '排行上限', desc: '排行榜展示上限条数' }
        ]
    },
    sys: {
        title: '系统设置',
        items: [
            { key: 'background', label: '背景模式', desc: '卡片背景显示模式 (0-4)' },
            { key: 'updateCheck', label: '更新检测', desc: '是否自动检测插件更新' }
        ]
    }
};
function AdminSettingsCard({ data }) {
    const groups = data.type && SETTING_GROUPS[data.type] ? { [data.type]: SETTING_GROUPS[data.type] } : SETTING_GROUPS;
    return (React.createElement(HTML, { style: { width: '550px' } },
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
                React.createElement("div", { style: { fontFamily: FONT_NZBZ, fontSize: '32px', color: '#d3bc8e' } }, "\u55B5\u55B5\u8BBE\u7F6E"),
                React.createElement("div", { style: { fontSize: '13px', opacity: 0.5, marginTop: '4px' } }, "\u4F7F\u7528 #\u55B5\u55B5xxx\u8BBE\u7F6E \u4FEE\u6539\u914D\u7F6E\u9879")),
            Object.entries(groups).map(([key, group]) => (React.createElement("div", { key: key, style: contStyle() },
                React.createElement("div", { style: contTitleStyle() },
                    React.createElement("span", { style: { fontFamily: FONT_NZBZ, fontSize: '15px' } }, group.title)),
                React.createElement("div", { style: { padding: '10px 12px' } }, group.items.map((item, i) => (React.createElement("div", { key: item.key, style: {
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        padding: '8px 10px',
                        borderBottom: i < group.items.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none'
                    } },
                    React.createElement("span", { style: {
                            fontSize: '13px',
                            fontWeight: 'bold',
                            color: '#d3bc8e',
                            whiteSpace: 'nowrap',
                            minWidth: '80px'
                        } }, item.label),
                    React.createElement("span", { style: { fontSize: '12px', opacity: 0.5, flex: 1 } }, item.desc)))))))),
            React.createElement("div", { style: contStyle() },
                React.createElement("div", { style: contTitleStyle() },
                    React.createElement("span", { style: { fontFamily: FONT_NZBZ, fontSize: '15px' } }, "\u4F7F\u7528\u8BF4\u660E")),
                React.createElement("div", { style: { padding: '12px 16px', fontSize: '12px', opacity: 0.6, lineHeight: '1.6' } },
                    React.createElement("div", null, "\u00B7 #\u55B5\u55B5\u8BBE\u7F6E \u2014 \u67E5\u770B\u5F53\u524D\u6240\u6709\u8BBE\u7F6E"),
                    React.createElement("div", null, "\u00B7 #\u55B5\u55B5\u9762\u677F\u8BBE\u7F6E \u2014 \u67E5\u770B\u9762\u677F\u76F8\u5173\u8BBE\u7F6E"),
                    React.createElement("div", null, "\u00B7 #\u55B5\u55B5\u6392\u884C\u8BBE\u7F6E \u2014 \u67E5\u770B\u6392\u884C\u76F8\u5173\u8BBE\u7F6E"),
                    React.createElement("div", null, "\u00B7 #\u55B5\u55B5\u66F4\u65B0 \u2014 \u66F4\u65B0\u63D2\u4EF6\u5230\u6700\u65B0\u7248\u672C"),
                    React.createElement("div", null, "\u00B7 #\u55B5\u55B5api \u2014 \u67E5\u770BAPI\u4F7F\u7528\u60C5\u51B5"))),
            React.createElement("div", { style: { position: 'relative', textAlign: 'right', padding: '8px 20px', fontSize: '12px', opacity: 0.4 } }, "Miao By ALemonJS"))));
}

export { AdminSettingsCard as default };
