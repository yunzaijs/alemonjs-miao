import React from 'react';
import HTML from './HTML.js';
import { ELEMENT_COLORS, FONT_FAMILY, FONT_NZBZ, RARITY_COLORS, ELEM_BG, contStyle, contTitleStyle } from './shared.js';

const RARITY_BAR = {
    2: '#8bddb8',
    3: '#80aeee',
    4: '#ba98f8',
    5: '#f7d07e'
};
const EIDOLON_COLORS = ['#5cbac2', '#339d61', '#3e95b9', '#3955b7', '#531ba9', '#ff5722'];
function SrAtlasCard({ data }) {
    const sr = data.srData;
    const elemColor = ELEMENT_COLORS[sr.element] ?? '#7e57c2';
    return (React.createElement(HTML, { style: { width: '800px' } },
        React.createElement("div", { style: {
                fontFamily: FONT_FAMILY,
                color: '#333',
                background: '#e6e6e6',
                width: '800px'
            } },
            React.createElement("div", { style: {
                    position: 'relative',
                    height: '380px',
                    background: '#fff',
                    overflow: 'hidden',
                    display: 'flex'
                } },
                React.createElement("div", { style: { width: '360px', position: 'relative', flexShrink: 0 } }, sr.portrait ? (React.createElement("img", { src: sr.portrait, style: {
                        position: 'absolute',
                        left: '-40px',
                        top: '-20px',
                        height: '420px',
                        objectFit: 'contain',
                        filter: 'drop-shadow(4px 4px 8px rgba(0,0,0,0.3))'
                    } })) : data.faceImg ? (React.createElement("img", { src: data.faceImg, style: {
                        position: 'absolute',
                        left: '80px',
                        top: '60px',
                        width: '200px',
                        height: '200px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: `4px solid ${elemColor}`
                    } })) : null),
                React.createElement("div", { style: { flex: 1, padding: '30px 30px 20px 0', position: 'relative', zIndex: 2 } },
                    React.createElement("div", { style: { fontFamily: FONT_NZBZ, fontSize: '36px', color: '#000' } }, sr.name),
                    React.createElement("div", { style: { display: 'flex', gap: '2px', marginTop: '4px' } }, Array.from({ length: sr.rarity }).map((_, i) => data.starIcon ? (React.createElement("img", { key: i, src: data.starIcon, style: { width: '28px', height: '28px' } })) : (React.createElement("span", { key: i, style: { fontSize: '24px', color: RARITY_COLORS[sr.rarity] ?? '#c6923a' } }, "\u2605")))),
                    React.createElement("div", { style: { display: 'flex', gap: '8px', marginTop: '10px', alignItems: 'center' } },
                        data.pathIcon && React.createElement("img", { src: data.pathIcon, style: { width: '36px', height: '36px' } }),
                        data.elementIcon && React.createElement("img", { src: data.elementIcon, style: { width: '36px', height: '36px' } }),
                        React.createElement("span", { style: { fontSize: '16px', color: '#666', marginLeft: '4px' } },
                            sr.path,
                            " \u00B7 ",
                            sr.element)),
                    React.createElement("div", { style: {
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '6px',
                            marginTop: '16px'
                        } }, sr.baseAttr.map(attr => (React.createElement("div", { key: attr.key, style: {
                            width: '195px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            background: 'rgba(242,242,242,0.9)',
                            border: '1px solid rgba(204,204,204,0.9)',
                            borderRadius: '4px 16px 4px 4px',
                            padding: '6px 14px',
                            fontSize: '13px'
                        } },
                        React.createElement("span", { style: { color: '#666' } }, attr.name),
                        React.createElement("span", { style: { fontWeight: 'bold' } }, attr.num))))),
                    sr.desc && (React.createElement("div", { style: { marginTop: '12px', fontSize: '12px', color: '#999', lineHeight: '1.5' } }, sr.desc.length > 60 ? sr.desc.slice(0, 60) + '...' : sr.desc)))),
            sr.materials.length > 0 && (React.createElement("div", { style: { margin: '10px 20px' } },
                React.createElement(SectionTitle, { title: '\u5347\u7EA7\u6D88\u8017 (Lv1-Lv80)' }),
                React.createElement("div", { style: { display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '12px 0' } }, sr.materials.slice(0, 12).map(mat => (React.createElement("div", { key: mat.id, style: {
                        width: '180px',
                        display: 'flex',
                        alignItems: 'center',
                        background: 'rgba(242,242,242,0.9)',
                        border: '1px solid rgba(204,204,204,0.9)',
                        borderRadius: '8px',
                        padding: '6px 8px',
                        position: 'relative',
                        overflow: 'hidden'
                    } },
                    React.createElement("div", { style: {
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            bottom: 0,
                            width: '6px',
                            background: RARITY_BAR[mat.rarity] ?? '#80aeee',
                            borderRadius: '8px 0 0 8px'
                        } }),
                    mat.icon && React.createElement("img", { src: mat.icon, style: { width: '32px', height: '32px', marginLeft: '10px', marginRight: '8px', borderRadius: '50%' } }),
                    React.createElement("div", { style: { flex: 1, minWidth: 0 } },
                        React.createElement("div", { style: { fontSize: '12px', color: '#333', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, mat.name),
                        React.createElement("div", { style: { fontSize: '11px', color: '#999' } },
                            "\u00D7",
                            mat.num)))))))),
            sr.skills.length > 0 && (React.createElement("div", { style: { margin: '10px 20px' } },
                React.createElement(SectionTitle, { title: '\u89D2\u8272\u884C\u8FF9' }),
                React.createElement("div", { style: { display: 'flex', flexDirection: 'column', gap: '6px', padding: '12px 0' } }, sr.skills.map(skill => (React.createElement("div", { key: skill.id, style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        background: 'rgba(242,242,242,0.9)',
                        borderRadius: '8px',
                        padding: '10px 14px',
                        border: '1px solid rgba(204,204,204,0.9)'
                    } },
                    skill.icon && (React.createElement("div", { style: {
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: '#2a2625',
                            flexShrink: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden'
                        } },
                        React.createElement("img", { src: skill.icon, style: { width: '32px', height: '32px' } }))),
                    React.createElement("div", { style: { flex: 1, minWidth: 0 } },
                        React.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: '6px' } },
                            React.createElement("span", { style: { fontSize: '14px', fontWeight: 'bold', color: '#333' } }, skill.name),
                            React.createElement("span", { style: {
                                    fontSize: '11px',
                                    color: '#fff',
                                    background: '#2a2625',
                                    borderRadius: '4px',
                                    padding: '1px 6px'
                                } }, skill.type_text),
                            skill.max_level > 1 && React.createElement("span", { style: { fontSize: '11px', color: '#999' } },
                                "Lv1-Lv",
                                skill.max_level)),
                        React.createElement("div", { style: { fontSize: '12px', color: '#666', marginTop: '3px', lineHeight: '1.4' } }, skill.simple_desc)))))))),
            sr.eidolons.length > 0 && (React.createElement("div", { style: { margin: '10px 20px' } },
                React.createElement(SectionTitle, { title: '\u661F\u9B42' }),
                React.createElement("div", { style: { display: 'flex', flexDirection: 'column', gap: '6px', padding: '12px 0' } }, sr.eidolons.map((eid, i) => (React.createElement("div", { key: eid.id, style: {
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        background: 'rgba(242,242,242,0.9)',
                        borderRadius: '8px',
                        padding: '10px 14px',
                        border: '1px solid rgba(204,204,204,0.9)',
                        borderLeft: `4px solid ${EIDOLON_COLORS[i] ?? '#999'}`
                    } },
                    eid.icon && (React.createElement("div", { style: {
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: '#2a2625',
                            flexShrink: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden'
                        } },
                        React.createElement("img", { src: eid.icon, style: { width: '32px', height: '32px' } }))),
                    React.createElement("div", { style: { flex: 1, minWidth: 0 } },
                        React.createElement("div", { style: { fontSize: '14px', fontWeight: 'bold', color: '#333' } },
                            React.createElement("span", { style: { color: EIDOLON_COLORS[i] ?? '#999', marginRight: '6px' } },
                                i + 1,
                                "\u9B42"),
                            eid.name),
                        React.createElement("div", { style: { fontSize: '12px', color: '#666', marginTop: '3px', lineHeight: '1.5' } }, eid.effect)))))))),
            React.createElement("div", { style: { textAlign: 'right', padding: '8px 24px 12px', fontSize: '12px', color: '#aaa' } }, "Miao By ALemonJS"))));
}
const GS_CONS_COLORS = ['#5cbac2', '#339d61', '#3e95b9', '#3955b7', '#531ba9', '#ff5722'];
const ELEM_CN = {
    pyro: '火',
    hydro: '水',
    anemo: '风',
    electro: '雷',
    dendro: '草',
    cryo: '冰',
    geo: '岩'
};
const WEAPON_CN = {
    sword: '单手剑',
    claymore: '双手剑',
    polearm: '长柄武器',
    bow: '弓',
    catalyst: '法器'
};
const GROW_ATTR_CN = {
    cpct: '暴击率',
    cdmg: '暴击伤害',
    mastery: '元素精通',
    recharge: '元素充能效率',
    heal: '治疗加成',
    hpPct: '生命值%',
    atkPct: '攻击力%',
    defPct: '防御力%',
    dmg: '元素伤害加成',
    phy: '物理伤害加成'
};
function stripHtml(s) {
    return s.replace(/<[^>]*>/g, '');
}
function GsAtlasCard({ data }) {
    const gs = data.gsData;
    const elemKey = gs?.elem ?? data.element ?? '';
    const elemCn = ELEM_CN[elemKey] ?? elemKey;
    const bgUrl = ELEM_BG[elemKey] ?? ELEM_BG[elemCn] ?? ELEM_BG['水'];
    const elemColor = ELEMENT_COLORS[elemCn] ?? ELEMENT_COLORS['水'];
    const star = gs?.star ?? data.rarity ?? 4;
    const rarityColor = RARITY_COLORS[star] ?? '#c6923a';
    const weaponCn = gs ? (WEAPON_CN[gs.weapon] ?? gs.weapon) : (data.weaponType ?? '');
    const contBox = (children) => React.createElement("div", { style: contStyle({ margin: '6px 0' }) }, children);
    const contHead = (title) => (React.createElement("div", { style: contTitleStyle({ borderRadius: '0', padding: '8px 16px' }) },
        React.createElement("span", { style: { fontFamily: FONT_NZBZ, fontSize: '15px' } }, title)));
    const pill = (text, bg) => (React.createElement("span", { style: {
            fontSize: '12px',
            padding: '2px 10px',
            borderRadius: '10px',
            background: bg,
            color: '#fff',
            display: 'inline-block',
            textShadow: '0 0 2px rgba(0,0,0,0.5)'
        } }, text));
    const metaRow = (label, value) => (React.createElement("div", { style: { display: 'flex', fontSize: '13px', lineHeight: '1.8' } },
        React.createElement("span", { style: { color: '#d3bc8e', width: '70px', flexShrink: 0 } }, label),
        React.createElement("span", { style: { color: '#fff' } }, value)));
    const materials = gs?.materials
        ? [gs.materials.gem, gs.materials.boss, gs.materials.specialty, gs.materials.normal, gs.materials.talent, gs.materials.weekly].filter(Boolean)
        : [];
    return (React.createElement(HTML, { style: { width: '600px' } },
        React.createElement("div", { style: {
                fontFamily: FONT_FAMILY,
                color: '#fff',
                width: '600px',
                backgroundImage: `url(${bgUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'left top',
                padding: '15px',
                position: 'relative',
                overflow: 'hidden'
            } },
            React.createElement("div", { style: {
                    display: 'flex',
                    gap: '16px',
                    padding: '16px',
                    marginBottom: '8px',
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius: '12px',
                    backdropFilter: 'blur(4px)',
                    position: 'relative'
                } },
                data.faceImg && (React.createElement("div", { style: {
                        width: '120px',
                        height: '120px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        border: `3px solid ${elemColor}`,
                        boxShadow: `0 0 12px ${elemColor}40, 0 4px 8px rgba(0,0,0,0.5)`,
                        flexShrink: 0
                    } },
                    React.createElement("img", { src: data.faceImg, style: { width: '100%', height: '100%', objectFit: 'cover' } }))),
                React.createElement("div", { style: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0 } },
                    React.createElement("div", { style: { display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' } },
                        React.createElement("span", { style: {
                                fontFamily: FONT_NZBZ,
                                fontSize: '32px',
                                textShadow: '0 0 3px #000, 2px 2px 4px rgba(0,0,0,0.7)',
                                lineHeight: '1.1'
                            } }, data.name),
                        gs?.title && React.createElement("span", { style: { fontSize: '14px', color: '#d3bc8e', textShadow: '0 0 2px #000' } }, gs.title)),
                    React.createElement("div", { style: { display: 'flex', gap: '1px', margin: '4px 0 8px' } }, Array.from({ length: star }).map((_, i) => (React.createElement("span", { key: i, style: { fontSize: '16px', color: rarityColor, textShadow: `0 0 4px ${rarityColor}` } }, "\u2605")))),
                    React.createElement("div", { style: { display: 'flex', gap: '6px', flexWrap: 'wrap' } },
                        elemCn && pill(elemCn, elemColor),
                        weaponCn && pill(weaponCn, 'rgba(255,255,255,0.15)'))),
                React.createElement("div", { style: {
                        position: 'absolute',
                        left: 0,
                        bottom: 0,
                        right: 0,
                        height: '3px',
                        borderRadius: '0 0 12px 12px',
                        background: `linear-gradient(90deg, ${rarityColor}, ${elemColor})`
                    } })),
            gs && (gs.astro || gs.birthday || gs.allegiance || gs.cncv) && (React.createElement("div", { style: {
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0 24px',
                    padding: '8px 16px',
                    marginBottom: '8px',
                    background: 'rgba(0,0,0,0.25)',
                    borderRadius: '8px',
                    backdropFilter: 'blur(2px)'
                } },
                gs.astro && metaRow('命之座', gs.astro),
                gs.birthday && metaRow('生日', gs.birthday),
                gs.allegiance && metaRow('归属', gs.allegiance),
                gs.cncv && metaRow('中文CV', gs.cncv),
                gs.jpcv && metaRow('日文CV', gs.jpcv))),
            gs &&
                contBox(React.createElement(React.Fragment, null,
                    contHead('Lv.90 基础属性'),
                    React.createElement("div", { style: { display: 'flex', flexWrap: 'wrap', padding: '6px' } }, [
                        ['生命值', String(Math.round(gs.baseAttr.hp)), '#4fc3f7'],
                        ['攻击力', String(Math.round(gs.baseAttr.atk)), '#ef5350'],
                        ['防御力', String(Math.round(gs.baseAttr.def)), '#ffa726'],
                        [GROW_ATTR_CN[gs.growAttr.key] ?? gs.growAttr.key, gs.growAttr.value + '%', '#ab47bc']
                    ].map(([label, value, accent]) => (React.createElement("div", { key: label, style: {
                            width: '50%',
                            padding: '6px 12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        } },
                        React.createElement("div", { style: {
                                width: '6px',
                                height: '28px',
                                borderRadius: '3px',
                                background: accent,
                                flexShrink: 0
                            } }),
                        React.createElement("div", null,
                            React.createElement("div", { style: { fontSize: '11px', color: '#d3bc8e' } }, label),
                            React.createElement("div", { style: { fontSize: '18px', fontFamily: FONT_NZBZ, lineHeight: '1.2' } }, value)))))))),
            materials.length > 0 &&
                contBox(React.createElement(React.Fragment, null,
                    contHead('突破材料'),
                    React.createElement("div", { style: { display: 'flex', flexWrap: 'wrap', padding: '8px 10px', gap: '6px' } }, materials.map((mat, i) => (React.createElement("div", { key: i, style: {
                            flex: '1 1 auto',
                            minWidth: '75px',
                            padding: '6px 10px',
                            borderRadius: '6px',
                            background: 'rgba(0,0,0,0.3)',
                            textAlign: 'center',
                            fontSize: '12px',
                            lineHeight: '1.4',
                            textShadow: '0 0 2px #000'
                        } }, mat)))))),
            gs &&
                gs.talents.length > 0 &&
                contBox(React.createElement(React.Fragment, null,
                    contHead('角色天赋'),
                    React.createElement("div", { style: { padding: '6px 10px' } }, gs.talents.map((t, ti) => (React.createElement("div", { key: t.key, style: {
                            display: 'flex',
                            gap: '10px',
                            padding: '8px 0',
                            borderBottom: ti < gs.talents.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none'
                        } },
                        React.createElement("div", { style: { flex: 1, minWidth: 0 } },
                            React.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' } },
                                React.createElement("span", { style: { fontFamily: FONT_NZBZ, fontSize: '13px', color: '#d3bc8e' } }, t.key === 'a' ? '普通攻击' : t.key === 'e' ? '元素战技' : '元素爆发'),
                                React.createElement("span", { style: { fontSize: '13px', fontWeight: 'bold' } }, t.name)),
                            t.desc.length > 0 && (React.createElement("div", { style: { fontSize: '12px', color: '#bbb', lineHeight: '1.5' } }, t.desc.slice(0, 2).map((d, i) => (React.createElement("div", { key: i }, stripHtml(d)))))),
                            t.tableNames.length > 0 && (React.createElement("div", { style: { display: 'flex', flexWrap: 'wrap', gap: '3px', marginTop: '4px' } },
                                t.tableNames.slice(0, 6).map(tn => (React.createElement("span", { key: tn, style: { fontSize: '11px', padding: '1px 6px', borderRadius: '3px', background: 'rgba(211,188,142,0.12)', color: '#d3bc8e' } }, tn))),
                                t.tableNames.length > 6 && React.createElement("span", { style: { fontSize: '11px', padding: '1px 6px', color: '#888' } },
                                    "+",
                                    t.tableNames.length - 6)))))))))),
            gs &&
                gs.passives.length > 0 &&
                contBox(React.createElement(React.Fragment, null,
                    contHead('固有天赋'),
                    React.createElement("div", { style: { padding: '6px 10px' } }, gs.passives.map((p, i) => (React.createElement("div", { key: i, style: {
                            padding: '6px 0',
                            borderBottom: i < gs.passives.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none'
                        } },
                        React.createElement("div", { style: { fontFamily: FONT_NZBZ, fontSize: '13px', color: '#d3bc8e', marginBottom: '2px' } },
                            "\uD83D\uDCDC ",
                            p.name),
                        React.createElement("div", { style: { fontSize: '12px', color: '#bbb', lineHeight: '1.5', paddingLeft: '18px' } },
                            p.desc.slice(0, 2).map((d, j) => (React.createElement("div", { key: j }, stripHtml(d)))),
                            p.desc.length > 2 && React.createElement("div", { style: { color: '#888' } }, "...")))))))),
            gs &&
                gs.constellations.length > 0 &&
                contBox(React.createElement(React.Fragment, null,
                    contHead(`命之座 · ${gs.astro || '命之座'}`),
                    React.createElement("div", { style: { padding: '6px 10px' } }, gs.constellations.map((c, i) => (React.createElement("div", { key: c.index, style: {
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '10px',
                            padding: '6px 0',
                            borderBottom: i < gs.constellations.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none'
                        } },
                        React.createElement("div", { style: {
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                background: `linear-gradient(135deg, ${GS_CONS_COLORS[i] ?? '#999'}, ${GS_CONS_COLORS[i] ?? '#999'}80)`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontFamily: FONT_NZBZ,
                                fontSize: '14px',
                                flexShrink: 0,
                                marginTop: '2px',
                                boxShadow: `0 0 6px ${GS_CONS_COLORS[i] ?? '#999'}40`
                            } }, c.index),
                        React.createElement("div", { style: { flex: 1, minWidth: 0 } },
                            React.createElement("div", { style: { fontSize: '13px', fontWeight: 'bold', color: '#d3bc8e', lineHeight: '1.6' } }, c.name),
                            React.createElement("div", { style: { fontSize: '12px', color: '#bbb', lineHeight: '1.5' } },
                                c.desc.slice(0, 2).map((d, j) => (React.createElement("div", { key: j }, stripHtml(d)))),
                                c.desc.length > 2 && React.createElement("div", { style: { color: '#888' } }, "..."))))))))),
            React.createElement("div", { style: { textAlign: 'center', padding: '6px 0 2px', fontSize: '12px', color: 'rgba(255,255,255,0.5)', textShadow: '0 0 1px #000' } },
                "\u8F93\u5165",
                React.createElement("span", { style: { color: '#d3bc8e' } },
                    "#",
                    data.name,
                    "\u5929\u8D4B\u3001#",
                    data.name,
                    "\u547D\u5EA7"),
                "\u53EF\u67E5\u770B\u8BE6\u7EC6\u4FE1\u606F"),
            React.createElement("div", { style: { textAlign: 'right', padding: '2px 10px 4px', fontSize: '11px', color: 'rgba(255,255,255,0.3)' } }, "Miao By ALemonJS"))));
}
function SectionTitle({ title }) {
    return (React.createElement("div", { style: {
            background: '#2a2625',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            padding: '10px 20px'
        } },
        React.createElement("span", { style: { fontFamily: FONT_NZBZ, fontSize: '18px', color: '#d6c297' } }, title)));
}
function AtlasCard({ data }) {
    if (data.game === 'sr' && data.srData) {
        return React.createElement(SrAtlasCard, { data: data });
    }
    return React.createElement(GsAtlasCard, { data: data });
}

export { AtlasCard as default };
