import React from 'react';
import HTML from './HTML.js';
import { elemBgUrl, FONT_FAMILY, FONT_NZBZ, contStyle, contTitleStyle } from './shared.js';

const COMMAND_LIST = [
    { cmd: '#喵喵帮助', desc: '查看帮助菜单' },
    { cmd: '#xxx面板', desc: '查看角色面板详情' },
    { cmd: '#更新面板', desc: '更新面板数据' },
    { cmd: '#xxx天赋', desc: '查看角色天赋信息' },
    { cmd: '#xxx命座', desc: '查看角色命座信息' },
    { cmd: '#xxx资料', desc: '查看角色基础资料' },
    { cmd: '#圣遗物列表', desc: '查看圣遗物总览' },
    { cmd: '#练度统计', desc: '查看角色练度统计' },
    { cmd: '#深渊', desc: '查看深渊战绩' },
    { cmd: '#武器', desc: '查看武器列表' },
    { cmd: '#角色卡片', desc: '查看角色卡片' },
    { cmd: '#日历', desc: '查看活动日历' },
    { cmd: '#喵喵设置', desc: '管理插件设置' }
];
function VersionCard({ data }) {
    return (React.createElement(HTML, { style: { width: '500px' } },
        React.createElement("div", { style: {
                fontFamily: FONT_FAMILY,
                color: '#fff',
                backgroundImage: `url(${elemBgUrl()})`,
                backgroundSize: 'cover',
                backgroundPosition: 'left top',
                position: 'relative',
                paddingBottom: '10px'
            } },
            React.createElement("div", { style: { position: 'relative', padding: '24px 20px 12px' } },
                React.createElement("div", { style: { fontFamily: FONT_NZBZ, fontSize: '32px', color: '#d3bc8e' } }, "Miao"),
                React.createElement("div", { style: { fontSize: '14px', opacity: 0.6, marginTop: '4px' } }, "AlemonJS Edition"),
                React.createElement("div", { style: {
                        display: 'inline-block',
                        marginTop: '8px',
                        padding: '3px 14px',
                        borderRadius: '12px',
                        background: 'rgba(98,168,234,0.6)',
                        fontSize: '14px',
                        fontWeight: 'bold'
                    } },
                    "v",
                    data.version)),
            React.createElement("div", { style: contStyle() },
                React.createElement("div", { style: contTitleStyle() },
                    React.createElement("span", { style: { fontFamily: FONT_NZBZ, fontSize: '16px' } }, "\u63D2\u4EF6\u4FE1\u606F")),
                React.createElement("div", { style: { padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px' } },
                    React.createElement("div", { style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '6px 14px',
                            background: 'rgba(0,0,0,0.15)',
                            borderRadius: '6px'
                        } },
                        React.createElement("span", { style: { fontSize: '13px', opacity: 0.7 } }, "\u4F5C\u8005"),
                        React.createElement("span", { style: { fontSize: '13px', fontWeight: 'bold' } }, data.author)),
                    React.createElement("div", { style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '6px 14px',
                            background: 'rgba(0,0,0,0.15)',
                            borderRadius: '6px'
                        } },
                        React.createElement("span", { style: { fontSize: '13px', opacity: 0.7 } }, "\u6846\u67B6"),
                        React.createElement("span", { style: { fontSize: '13px', fontWeight: 'bold' } }, "AlemonJS")),
                    React.createElement("div", { style: {
                            padding: '6px 14px',
                            background: 'rgba(0,0,0,0.15)',
                            borderRadius: '6px',
                            fontSize: '12px',
                            opacity: 0.7
                        } }, data.description))),
            React.createElement("div", { style: contStyle() },
                React.createElement("div", { style: contTitleStyle() },
                    React.createElement("span", { style: { fontFamily: FONT_NZBZ, fontSize: '16px' } }, "\u652F\u6301\u7684\u6307\u4EE4")),
                React.createElement("div", { style: { padding: '10px 12px' } }, COMMAND_LIST.map((item, i) => (React.createElement("div", { key: i, style: {
                        display: 'flex',
                        alignItems: 'center',
                        padding: '5px 8px',
                        borderBottom: i < COMMAND_LIST.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                        gap: '10px'
                    } },
                    React.createElement("span", { style: {
                            fontSize: '12px',
                            fontWeight: 'bold',
                            color: '#d3bc8e',
                            whiteSpace: 'nowrap'
                        } }, item.cmd),
                    React.createElement("span", { style: { fontSize: '12px', opacity: 0.5 } }, item.desc)))))),
            React.createElement("div", { style: { position: 'relative', textAlign: 'right', padding: '8px 20px', fontSize: '12px', opacity: 0.4 } }, "Miao By ALemonJS"))));
}

export { VersionCard as default };
