import React from 'react';
import HTML from './HTML.js';
import { ELEMENT_COLORS, FONT_FAMILY, FONT_NZBZ, RARITY_COLORS, ELEM_BG } from './shared.js';

const RARITY_BAR = {
    2: '#8bddb8',
    3: '#80aeee',
    4: '#ba98f8',
    5: '#f7d07e'
};
const EIDOLON_COLORS = ['#5cbac2', '#339d61', '#3e95b9', '#3955b7', '#531ba9', '#ff5722'];
const WEAPON_ICONS = {
    单手剑: '🗡️',
    双手剑: '⚔️',
    长柄武器: '🔱',
    弓: '🏹',
    法器: '📖'
};
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
function GsAtlasCard({ data }) {
    const elemColor = ELEMENT_COLORS[data.element ?? ''] ?? '#888';
    const bgUrl = ELEM_BG[data.element ?? ''] ?? ELEM_BG['水'];
    return (React.createElement(HTML, { style: { width: '460px' } },
        React.createElement("div", { style: {
                fontFamily: FONT_FAMILY,
                color: '#fff',
                backgroundImage: `url(${bgUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'left top',
                position: 'relative',
                paddingBottom: '10px'
            } },
            React.createElement("div", { style: {
                    position: 'relative',
                    padding: '20px',
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'flex-start'
                } },
                React.createElement("div", { style: {
                        width: '120px',
                        height: '120px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        border: `3px solid ${elemColor}`,
                        boxShadow: `0 0 12px ${elemColor}40`,
                        flexShrink: 0,
                        background: 'rgba(0,0,0,0.3)'
                    } }, data.faceImg ? (React.createElement("img", { src: data.faceImg, style: { width: '100%', height: '100%', objectFit: 'cover' } })) : (React.createElement("div", { style: {
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '40px',
                        opacity: 0.3
                    } }, "?"))),
                React.createElement("div", { style: { flex: 1 } },
                    React.createElement("div", { style: { fontFamily: FONT_NZBZ, fontSize: '28px', color: '#d3bc8e' } }, data.name),
                    React.createElement("div", { style: {
                            fontSize: '12px',
                            opacity: 0.6,
                            marginTop: '2px',
                            padding: '2px 8px',
                            background: 'rgba(232,213,176,0.3)',
                            borderRadius: '8px',
                            display: 'inline-block'
                        } }, "\u539F\u795E"),
                    data.rarity && (React.createElement("div", { style: { display: 'flex', gap: '2px', marginTop: '6px' } }, Array.from({ length: data.rarity }).map((_, i) => (React.createElement("span", { key: i, style: {
                            fontSize: '20px',
                            color: RARITY_COLORS[data.rarity] ?? '#c6923a',
                            textShadow: `0 0 4px ${RARITY_COLORS[data.rarity] ?? '#c6923a'}`
                        } }, "\u2605"))))),
                    React.createElement("div", { style: { marginTop: '10px', display: 'flex', gap: '8px', flexWrap: 'wrap' } },
                        data.element && (React.createElement("span", { style: { padding: '3px 12px', borderRadius: '12px', background: `${elemColor}80`, fontSize: '14px', fontWeight: 'bold' } }, data.element)),
                        data.weaponType && (React.createElement("span", { style: { padding: '3px 12px', borderRadius: '12px', background: 'rgba(255,255,255,0.15)', fontSize: '14px' } },
                            WEAPON_ICONS[data.weaponType] ?? '',
                            " ",
                            data.weaponType))))),
            React.createElement("div", { style: {
                    margin: '0 15px 10px',
                    background: 'rgba(0,0,0,0.25)',
                    borderRadius: '10px',
                    overflow: 'hidden'
                } },
                React.createElement("div", { style: { background: 'rgba(0,0,0,0.4)', padding: '10px 20px', color: '#d3bc8e', fontFamily: FONT_NZBZ, fontSize: '16px' } }, "\u89D2\u8272\u56FE\u9274"),
                React.createElement("div", { style: { padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px' } },
                    data.element && React.createElement(GsInfoRow, { label: '\u5143\u7D20', value: data.element }),
                    data.rarity && React.createElement(GsInfoRow, { label: '\u7A00\u6709\u5EA6', value: '★'.repeat(data.rarity) }),
                    data.weaponType && React.createElement(GsInfoRow, { label: '\u6B66\u5668\u7C7B\u578B', value: data.weaponType }),
                    React.createElement(GsInfoRow, { label: '\u6240\u5C5E\u6E38\u620F', value: '\u539F\u795E' }))),
            React.createElement("div", { style: { textAlign: 'right', padding: '4px 20px 8px', fontSize: '12px', opacity: 0.4 } }, "Miao By ALemonJS"))));
}
function GsInfoRow({ label, value }) {
    return (React.createElement("div", { style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 16px',
            background: 'rgba(0,0,0,0.15)',
            borderRadius: '6px'
        } },
        React.createElement("span", { style: { fontSize: '14px', opacity: 0.7 } }, label),
        React.createElement("span", { style: { fontSize: '15px', fontWeight: 'bold' } }, value)));
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
