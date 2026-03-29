import fileUrl$2 from '../../assets/help/icon.png.js';
import React from 'react';
import HTML from './HTML.js';
import { FONT_FAMILY, FONT_NZBZ } from './shared.js';
import fileUrl from '../../assets/common/bg-01.jpg.js';
import fileUrl$1 from '../../assets/common/main-01.png.js';

const STYLE = {
    fontColor: '#ceb78b',
    descColor: '#eee80',
    headerColor: '#00008e',
    contBg: 'rgba(6, 21, 31, .5)',
    contBgBlur: 3,
    headerBg: 'rgba(6, 21, 31, .4)',
    rowBg1: 'rgba(6, 21, 31, .2)',
    rowBg2: 'rgba(6, 21, 31, .35)'
};
const HELP_LIST = [
    {
        group: '游戏面板与信息查询',
        list: [
            { icon: 61, title: '#角色 #角色卡片 #探索', desc: '你的原神角色数据，数据来自米游社' },
            { icon: 63, title: '#面板 #更新面板', desc: '查看已经获取面板信息的角色列表' },
            { icon: 66, title: '#雷神面板 #雷神伤害', desc: '查看角色详细面板及伤害信息' },
            { icon: 65, title: '#圣遗物列表 #雷神圣遗物', desc: '查看圣遗物列表 / 评分详情' },
            { icon: 64, title: '#深渊 #深渊12层', desc: '深渊数据，打完请2小时后查询' },
            { icon: 64, title: '#幻想 #幻想真境剧诗', desc: '幻想真境剧诗数据' },
            { icon: 64, title: '#幽境 #幽境危战', desc: '幽境危战数据' },
            { icon: 67, title: '#五星 #武器 #今日素材', desc: '你的原神角色详情数据' },
            { icon: 62, title: '#五星列表 #练度统计', desc: '角色列表数据' },
            { icon: 77, title: '#深渊出场率 #深渊使用率', desc: '查看本期深渊使用或出场统计' },
            { icon: 78, title: '#角色持有 #角色0命', desc: '查看角色的持有率、0命统计' }
        ]
    },
    {
        group: '资料及图片',
        list: [
            { icon: 58, title: '#刻晴 #心海', desc: '你的原神角色卡片' },
            { icon: 59, title: '#老婆 #老公', desc: '查看老婆、老公' },
            { icon: 60, title: '#老婆设置心海,雷神', desc: '设置老婆列表，也可设置随机' },
            { icon: 88, title: '#老婆照片 #甘雨照片', desc: '查看指定角色的图片' },
            { icon: 53, title: '#夜兰天赋 #胡桃命座', desc: '查看角色的天赋与命座资料' },
            { icon: 20, title: '#刻晴攻略', desc: '西风驿站攻略' },
            { icon: 78, title: '#刻晴排行 #甘雨双爆排行', desc: '查看角色群内排名' },
            { icon: 55, title: '#最强刻晴 #最强甘雨', desc: '查看群内最强角色面板' }
        ]
    },
    {
        group: '其他查询指令',
        list: [
            { icon: 83, title: '#日历 #日历列表', desc: '查看活动日历' },
            { icon: 6, title: '#抽卡记录 #记录帮助', desc: '统计游戏抽卡数据' },
            { icon: 21, title: '#角色统计 #武器统计', desc: '按卡池统计抽卡数据' },
            { icon: 8, title: '#角色卡池 #武器卡池', desc: '查看复刻卡池历史统计' },
            { icon: 74, title: '戳一戳', desc: '戳一戳发送随机角色卡片' },
            { icon: 79, title: '#帮助 #版本 #喵喵版本', desc: '其他命令' }
        ]
    },
    {
        group: '管理命令，仅管理员可用',
        list: [
            { icon: 85, title: '#开启排名 #关闭排名', desc: '开启或关闭群内排名功能' },
            { icon: 32, title: '#喵喵设置', desc: '配置喵喵功能' },
            { icon: 60, title: '#上传面板图 #删除面板图', desc: '管理角色面板图素材' }
        ]
    }
];
const COL_COUNT = 3;
function iconStyle(icon) {
    if (!icon) {
        return { display: 'none' };
    }
    const idx = icon - 1;
    const x = idx % 10;
    const y = Math.floor(idx / 10);
    return {
        width: '40px',
        height: '40px',
        display: 'block',
        position: 'absolute',
        backgroundImage: `url(${fileUrl$2})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '500px auto',
        backgroundPosition: `-${x * 50}px -${y * 50}px`,
        borderRadius: '5px',
        left: '6px',
        top: '12px',
        transform: 'scale(0.85)'
    };
}
function HelpRow({ items, rowIdx }) {
    const bg = rowIdx % 2 === 0 ? STYLE.rowBg1 : STYLE.rowBg2;
    const cells = [...items];
    while (cells.length < COL_COUNT) {
        cells.push(null);
    }
    return (React.createElement("div", { style: { display: 'table-row', background: bg } }, cells.map((item, ci) => (React.createElement("div", { key: ci, style: {
            display: 'table-cell',
            padding: '12px 0 12px 50px',
            lineHeight: '24px',
            fontSize: '14px',
            position: 'relative',
            textAlign: 'left',
            boxShadow: '0 0 1px 0 #888 inset',
            width: `${100 / COL_COUNT}%`,
            verticalAlign: 'top'
        } }, item && (React.createElement(React.Fragment, null,
        React.createElement("span", { style: iconStyle(item.icon) }),
        React.createElement("strong", { style: { display: 'block', color: STYLE.fontColor, fontSize: '16px', lineHeight: '24px' } }, item.title),
        React.createElement("span", { style: { display: 'block', fontSize: '13px', lineHeight: '18px', color: STYLE.descColor } }, item.desc))))))));
}
function MiaoHelp() {
    return (React.createElement(HTML, { style: { width: '830px' } },
        React.createElement("div", { style: {
                width: '830px',
                fontFamily: FONT_FAMILY,
                color: '#fff',
                minHeight: '400px',
                backgroundImage: `url(${fileUrl})`,
                backgroundSize: '100% auto',
                backgroundRepeat: 'repeat-y',
                position: 'relative'
            } },
            React.createElement("div", { style: {
                    width: '830px',
                    backgroundImage: `url(${fileUrl$1})`,
                    backgroundPosition: 'top left',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100% auto',
                    paddingBottom: '20px'
                } },
                React.createElement("div", { style: { paddingBottom: '0', padding: '0 30px' } },
                    React.createElement("div", { style: {
                            fontSize: '50px',
                            fontWeight: 'bold',
                            fontFamily: FONT_NZBZ,
                            color: STYLE.fontColor,
                            textShadow: '0 0 1px rgba(6,21,31,.9)',
                            lineHeight: '1.2'
                        } }, "\u55B5\u55B5\u5E2E\u52A9"),
                    React.createElement("div", { style: {
                            fontSize: '16px',
                            color: STYLE.headerColor,
                            marginTop: '4px',
                            opacity: 0.8
                        } }, "AlemonJS & Miao By ALemonJS")),
                React.createElement("div", { style: { padding: '0 15px' } }, HELP_LIST.map((group, gi) => {
                    const rows = [];
                    for (let i = 0; i < group.list.length; i += COL_COUNT) {
                        rows.push(group.list.slice(i, i + COL_COUNT));
                    }
                    return (React.createElement("div", { key: gi, style: {
                            background: STYLE.contBg,
                            borderRadius: '15px',
                            marginTop: '20px',
                            marginBottom: '20px',
                            overflow: 'hidden',
                            boxShadow: '0 5px 10px 0 rgba(0,0,0,0.15)',
                            backdropFilter: `blur(${STYLE.contBgBlur}px)`,
                            position: 'relative'
                        } },
                        React.createElement("div", { style: {
                                fontSize: '18px',
                                fontWeight: 'bold',
                                color: STYLE.fontColor,
                                padding: '15px 15px 10px 20px',
                                background: STYLE.headerBg
                            } }, group.group),
                        React.createElement("div", { style: {
                                display: 'table',
                                width: '100%',
                                borderCollapse: 'collapse',
                                borderRadius: '0 0 10px 10px',
                                overflow: 'hidden'
                            } }, rows.map((rowItems, ri) => (React.createElement(HelpRow, { key: ri, items: rowItems, rowIdx: ri }))))));
                }))))));
}

export { MiaoHelp as default };
