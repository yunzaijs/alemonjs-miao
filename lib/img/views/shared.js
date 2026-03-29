export { default as URL_BG01 } from '../../assets/common/bg-01.jpg.js';
import fileUrl$6 from '../../assets/common/bg/bg-anemo.webp.js';
import fileUrl$3 from '../../assets/common/bg/bg-cryo.webp.js';
import fileUrl$4 from '../../assets/common/bg/bg-dendro.webp.js';
import fileUrl$5 from '../../assets/common/bg/bg-electro.webp.js';
import fileUrl$2 from '../../assets/common/bg/bg-geo.webp.js';
import fileUrl$7 from '../../assets/common/bg/bg-hydro.webp.js';
import fileUrl$8 from '../../assets/common/bg/bg-pyro.webp.js';
import fileUrl$1 from '../../assets/common/bg/bg-quantum.webp.js';
import fileUrl from '../../assets/common/bg/bg-sr.webp.js';
import fileUrl$9 from '../../assets/common/card-bg.png.js';
export { default as URL_CROWN } from '../../assets/common/crown.png.js';
import fileUrl$b from '../../assets/common/icon.png.js';
export { default as URL_ITEM_BG3 } from '../../assets/common/item/bg3.png.js';
export { default as URL_ITEM_BG4 } from '../../assets/common/item/bg4.png.js';
export { default as URL_ITEM_BG5 } from '../../assets/common/item/bg5.png.js';
import fileUrl$c from '../../assets/common/item/fetter.png.js';
export { default as URL_MAIN01 } from '../../assets/common/main-01.png.js';
import fileUrl$a from '../../assets/common/mark-icon.png.js';
import dayjs from 'dayjs';

const ELEM_BG = {
    火: fileUrl$8,
    水: fileUrl$7,
    风: fileUrl$6,
    雷: fileUrl$5,
    草: fileUrl$4,
    冰: fileUrl$3,
    岩: fileUrl$2,
    物理: fileUrl,
    量子: fileUrl$1,
    虚数: fileUrl$2,
    pyro: fileUrl$8,
    hydro: fileUrl$7,
    anemo: fileUrl$6,
    electro: fileUrl$5,
    dendro: fileUrl$4,
    cryo: fileUrl$3,
    geo: fileUrl$2,
    quantum: fileUrl$1,
    sr: fileUrl
};
function elemBgUrl(element) {
    return (element && ELEM_BG[element]) ?? ELEM_BG.hydro;
}
const ELEMENT_COLORS = {
    火: '#ef5350',
    水: '#42a5f5',
    风: '#66bb6a',
    雷: '#ab47bc',
    草: '#8bc34a',
    冰: '#29b6f6',
    岩: '#ffa726',
    物理: '#9e9e9e',
    量子: '#7e57c2',
    虚数: '#fdd835'
};
const STAR_COLORS = {
    5: '#ce8d54',
    4: '#a0a0e8',
    3: '#6ba8e8'
};
const RARITY_COLORS = {
    5: '#c6923a',
    4: '#a256e1',
    3: '#5180cb'
};
const CONS_COLORS = {
    0: '#666666',
    1: '#5cbac2',
    2: '#339d61',
    3: '#3e95b9',
    4: '#3955b7',
    5: '#531ba9',
    6: '#ff5722'
};
const CONS_SUFFIX = {
    gs: '命',
    sr: '魂'
};
const GAME_ACCENT = {
    gs: '#e8d5b0',
    sr: '#c5b4e3',
    zzz: '#b4e3c5'
};
const DARK_BG = 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)';
function contStyle(extra) {
    return {
        borderRadius: '10px',
        background: `url(${fileUrl$9}) top left repeat-x`,
        backgroundSize: 'auto 100%',
        margin: '5px 15px 5px 10px',
        position: 'relative',
        boxShadow: '0 0 1px 0 #ccc, 2px 2px 4px 0 rgba(50,50,50,0.8)',
        overflow: 'hidden',
        color: '#fff',
        fontSize: '16px',
        ...extra
    };
}
function contTitleStyle(extra) {
    return {
        background: 'rgba(0,0,0,0.4)',
        boxShadow: '0 0 1px 0 #fff',
        color: '#d3bc8e',
        padding: '10px 20px',
        textAlign: 'left',
        borderRadius: '10px 10px 0 0',
        fontWeight: 'bold',
        ...extra
    };
}
function fetterStyle(level, size = 32) {
    const pct = level <= 0 ? 0 : ((Math.min(level, 10) - 1) / 9) * 100;
    return {
        width: `${size}px`,
        height: `${size}px`,
        display: 'inline-block',
        backgroundImage: `url(${fileUrl$c})`,
        backgroundSize: 'auto 100%',
        backgroundPosition: `${pct}% 0`
    };
}
function statIconStyle(key) {
    const map = {
        hp: 1,
        atk: 2,
        def: 3,
        mastery: 4,
        cpct: 5,
        cdmg: 6,
        stance: 4,
        recharge: 7,
        dmg: 8,
        heal: 9,
        speed: 10,
        effPct: 11,
        effDef: 12,
        elation: 13
    };
    const idx = map[key] ?? 0;
    return {
        display: 'inline-block',
        width: '16px',
        height: '16px',
        backgroundImage: `url(${fileUrl$b})`,
        backgroundSize: 'auto 16px',
        backgroundPosition: `-${idx * 16}px 0`,
        verticalAlign: 'middle',
        marginRight: '4px'
    };
}
function rankIconStyle(type) {
    return {
        width: '16px',
        height: '16px',
        display: 'inline-block',
        backgroundImage: `url(${fileUrl$a})`,
        backgroundSize: 'auto 100%',
        backgroundPosition: type === 'mark' ? '100% 0' : '0 0',
        verticalAlign: 'bottom',
        marginRight: '3px'
    };
}
const FONT_FAMILY = '"HYWH", "tttgbnumber", "PingFang SC", system-ui, sans-serif';
const FONT_NZBZ = '"NZBZ", "HYWH", "tttgbnumber", system-ui, sans-serif';
function formatDate() {
    return dayjs().format('YYYY-MM-DD HH:mm');
}
function formatDateZh() {
    return dayjs().format('YYYY/M/D HH:mm:ss');
}

export { CONS_COLORS, CONS_SUFFIX, DARK_BG, ELEMENT_COLORS, ELEM_BG, FONT_FAMILY, FONT_NZBZ, GAME_ACCENT, RARITY_COLORS, STAR_COLORS, fileUrl$9 as URL_CARD_BG, fileUrl$c as URL_FETTER, fileUrl$a as URL_MARK_ICON, fileUrl$b as URL_STAT_ICON, contStyle, contTitleStyle, elemBgUrl, fetterStyle, formatDate, formatDateZh, rankIconStyle, statIconStyle };
