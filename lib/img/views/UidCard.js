import React from 'react';
import HTML from './HTML.js';
import { elemBgUrl, FONT_FAMILY, contStyle, contTitleStyle, FONT_NZBZ, CONS_COLORS } from './shared.js';
import fileUrl from '../../assets/common/item/bg5.png.js';
import fileUrl$1 from '../../assets/common/item/bg4.png.js';

function formatActiveDay(num) {
    if (!num) {
        return '';
    }
    const year = Math.floor(num / 365);
    const month = Math.floor((num % 365) / 30.41);
    const day = Math.floor((num % 365) % 30.41);
    let msg = '';
    if (year > 0) {
        msg += `${year}年`;
    }
    if (month > 0) {
        msg += `${month}个月`;
    }
    if (day > 0) {
        msg += `${day}天`;
    }
    return msg;
}
const CHEST_MAP = [
    { key: 'commonChest', title: '普通', max: 2807 },
    { key: 'exquisiteChest', title: '精致', max: 1245 },
    { key: 'preciousChest', title: '珍贵', max: 638 },
    { key: 'luxuriousChest', title: '华丽', max: 282 },
    { key: 'magicChest', title: '奇馈', max: 145 }
];
const STAT_ITEMS = [
    { key: 'achievement', label: '成就' },
    { key: 'wayPoint', label: '锚点' },
    { key: 'avatar', label: '角色' },
    { key: 'avatar5', label: '五星角色' },
    { key: 'goldCount', label: '金卡总数' }
];
function UidCard({ data }) {
    const { uid, nickname, level, stats, exploration, avatars, isSelfCk } = data;
    const activeDayStr = formatActiveDay(stats.activeDay);
    const hasStat = STAT_ITEMS.some(s => stats[s.key]);
    const hasExploration = exploration.length > 0;
    const hasChest = !!stats.commonChest;
    return (React.createElement(HTML, { style: { width: '740px' } },
        React.createElement("div", { style: {
                fontFamily: FONT_FAMILY,
                color: '#fff',
                backgroundImage: `url(${elemBgUrl(avatars[0]?.element)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'left top',
                position: 'relative',
                paddingBottom: '10px'
            } },
            React.createElement("div", { style: {
                    height: '90px',
                    backgroundColor: '#f0ece4',
                    borderRadius: '50px',
                    padding: '1px',
                    margin: '5px 0',
                    display: 'flex',
                    position: 'relative',
                    whiteSpace: 'nowrap'
                } },
                React.createElement("div", { style: {
                        width: '70px',
                        height: '70px',
                        margin: '10px',
                        borderRadius: '50%',
                        boxShadow: '0 0 1px #000, 0 0 5px rgba(0,0,0,0.5)',
                        border: '3px solid #fff',
                        overflow: 'hidden',
                        backgroundImage: avatars[0]?.icon ? `url(${avatars[0].icon})` : undefined,
                        backgroundColor: '#c0a97a',
                        backgroundSize: 'cover'
                    } }, avatars[0]?.icon && React.createElement("img", { src: avatars[0].icon, style: { width: '64px', height: '64px', objectFit: 'cover' } })),
                React.createElement("div", { style: { padding: '15px 5px', color: '#414e64', textShadow: '0 0 2px #f0ece4, 0 0 5px #f0ece4' } },
                    React.createElement("div", { style: { height: '34px', lineHeight: '34px' } },
                        React.createElement("strong", { style: { fontSize: '24px' } }, nickname || `#${uid}`),
                        level > 1 && React.createElement("span", { style: { paddingLeft: '5px' } },
                            "Lv.",
                            level)),
                    React.createElement("div", { style: { height: '22px', lineHeight: '22px', fontSize: '16px' } },
                        React.createElement("span", null,
                            "#",
                            uid),
                        activeDayStr && React.createElement("span", { style: { paddingLeft: '8px' } }, activeDayStr))),
                hasStat && (React.createElement("div", { style: {
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        display: 'flex',
                        margin: '16px',
                        borderRadius: '29px',
                        height: '58px',
                        boxShadow: '0 0 5px 0 rgba(0,0,0,0.4)',
                        overflow: 'hidden'
                    } }, STAT_ITEMS.filter(s => stats[s.key]).map((s, i, arr) => (React.createElement("div", { key: s.key, style: {
                        padding: '7px',
                        width: i === 0 || i === arr.length - 1 ? '80px' : '70px',
                        paddingLeft: i === 0 ? '17px' : '7px',
                        paddingRight: i === arr.length - 1 ? '17px' : '7px',
                        height: '58px',
                        textAlign: 'center',
                        textShadow: '0 0 1px #fff',
                        background: i % 2 === 0 ? 'rgba(255,255,255,0.65)' : 'rgba(220,220,220,0.5)'
                    } },
                    React.createElement("strong", { style: { fontSize: '22px', display: 'block', color: '#414e64' } }, stats[s.key]),
                    React.createElement("span", { style: { display: 'block', fontSize: '14px', color: '#414e64' } }, s.label))))))),
            !isSelfCk && (React.createElement("div", { style: {
                    textAlign: 'center',
                    color: 'rgba(255,255,255,0.9)',
                    fontSize: '13px',
                    padding: '4px 15px'
                } },
                "\u672A\u7ED1\u5B9ACK\u6216CK\u5931\u6548\uFF0C\u4FE1\u606F\u53EF\u80FD\u4E0D\u5B8C\u5168\u3002\u53D1\u9001",
                React.createElement("strong", { style: { color: '#d3bc8e', fontWeight: 'normal', padding: '0 2px' } }, "#\u4F53\u529B\u5E2E\u52A9"),
                "\u67E5\u770BCK\u7ED1\u5B9A\u65B9\u6CD5")),
            hasExploration && (React.createElement("div", { style: { display: 'flex', flexWrap: 'wrap', margin: '10px 0', justifyContent: 'center' } }, exploration.map((city, idx) => (React.createElement("div", { key: idx, style: {
                    width: '82px',
                    height: '102px',
                    background: 'rgba(0,0,0,0.35)',
                    borderRadius: '4px',
                    margin: '3px',
                    textAlign: 'center',
                    color: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '4px 0'
                } },
                React.createElement("span", { style: { marginTop: '53px', fontSize: '13px', height: '16px', lineHeight: '16px', textShadow: '0 0 1px rgba(0,0,0,0.5)' } }, city.name),
                React.createElement("strong", { style: {
                        fontSize: '20px',
                        height: '30px',
                        lineHeight: '30px',
                        textShadow: '0 0 1px #000, 1px 1px 3px rgba(0,0,0,0.5)',
                        fontWeight: 'normal'
                    } },
                    city.pct,
                    "%")))))),
            hasChest && (React.createElement("div", { style: {
                    ...contStyle(),
                    background: 'rgba(0,0,0,0.6)',
                    padding: '0 15px',
                    display: 'flex',
                    justifyContent: 'center'
                } }, CHEST_MAP.map((cfg, idx) => {
                const val = stats[cfg.key] ?? 0;
                const max = cfg.max > val ? cfg.max : val;
                return (React.createElement("div", { key: cfg.key, style: { width: '20%', display: 'flex', padding: '15px 0', background: idx % 2 === 1 ? 'rgba(50,50,50,0.5)' : 'transparent' } },
                    React.createElement("div", { style: {
                            fontSize: '24px',
                            lineHeight: '40px',
                            height: '40px',
                            paddingRight: '8px',
                            textAlign: 'right',
                            width: '70px',
                            textShadow: '0 0 1px #000, 1px 1px 3px rgba(0,0,0,0.5)'
                        } }, val),
                    React.createElement("div", { style: { width: '60px', height: '40px', fontSize: '14px' } },
                        React.createElement("div", { style: { display: 'flex', height: '20px', lineHeight: '20px' } },
                            React.createElement("div", { style: { paddingLeft: '3px', color: '#aaa' } }, max)),
                        React.createElement("div", { style: { height: '20px', color: '#d3bc8e' } }, cfg.title))));
            }))),
            avatars.length > 0 && (React.createElement("div", { style: { ...contStyle(), background: 'rgba(0,0,0,0.5)', padding: 0, margin: '10px 0' } },
                React.createElement("div", { style: contTitleStyle() },
                    React.createElement("span", { style: { fontFamily: FONT_NZBZ, fontSize: '15px' } }, "\u89D2\u8272\u5217\u8868")),
                React.createElement("div", { style: { display: 'flex', flexWrap: 'wrap', padding: '8px' } }, avatars.map(av => {
                    const rarityBg = av.rarity === 5 ? fileUrl : fileUrl$1;
                    const consBg = CONS_COLORS[av.cons] ?? CONS_COLORS[0];
                    return (React.createElement("div", { key: av.id, style: {
                            width: '62px',
                            margin: '5px',
                            backgroundColor: '#e7e5d9',
                            borderRadius: '5px',
                            overflow: 'hidden',
                            fontSize: '10px',
                            textAlign: 'center',
                            color: '#333'
                        } },
                        React.createElement("div", { style: { width: '62px', height: '62px', backgroundImage: `url(${rarityBg})`, backgroundSize: '100% 100%', position: 'relative' } },
                            av.icon && React.createElement("img", { src: av.icon, style: { width: '62px', height: '62px', objectFit: 'cover' } }),
                            React.createElement("span", { style: {
                                    position: 'absolute',
                                    right: '1px',
                                    bottom: '1px',
                                    background: consBg,
                                    color: '#fff',
                                    fontSize: '9px',
                                    padding: '1px 4px',
                                    borderRadius: '3px',
                                    lineHeight: '12px'
                                } },
                                av.cons,
                                data.game === 'sr' ? '魂' : '命'),
                            React.createElement("span", { style: {
                                    position: 'absolute',
                                    left: '1px',
                                    bottom: '1px',
                                    background: 'rgba(0,0,0,0.5)',
                                    color: '#fff',
                                    fontSize: '9px',
                                    padding: '1px 3px',
                                    borderRadius: '3px',
                                    lineHeight: '12px'
                                } },
                                "Lv.",
                                av.level)),
                        React.createElement("div", { style: { padding: '3px 1px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' } }, av.name)));
                })),
                React.createElement("div", { style: { textAlign: 'right', padding: '4px 15px 8px', fontSize: '12px', color: '#aaa' } },
                    "\u5171 ",
                    avatars.length,
                    " \u4E2A\u89D2\u8272"))),
            React.createElement("div", { style: { position: 'relative', textAlign: 'right', padding: '8px 20px', fontSize: '12px', opacity: 0.4 } }, "Miao By ALemonJS"))));
}

export { UidCard as default };
