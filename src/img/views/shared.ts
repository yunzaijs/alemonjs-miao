/**
 * 共享设计常量与工具函数
 */

import type React from 'react';

// ─── 公共图片资源 ─────────────────────────────────────

import URL_BG01 from '@src/assets/common/bg-01.jpg';
import URL_BG_ANEMO from '@src/assets/common/bg/bg-anemo.webp';
import URL_BG_CRYO from '@src/assets/common/bg/bg-cryo.webp';
import URL_BG_DENDRO from '@src/assets/common/bg/bg-dendro.webp';
import URL_BG_ELECTRO from '@src/assets/common/bg/bg-electro.webp';
import URL_BG_GEO from '@src/assets/common/bg/bg-geo.webp';
import URL_BG_HYDRO from '@src/assets/common/bg/bg-hydro.webp';
import URL_BG_PYRO from '@src/assets/common/bg/bg-pyro.webp';
import URL_BG_QUANTUM from '@src/assets/common/bg/bg-quantum.webp';
import URL_BG_SR from '@src/assets/common/bg/bg-sr.webp';
import URL_CARD_BG from '@src/assets/common/card-bg.png';
import URL_CROWN from '@src/assets/common/crown.png';
import URL_STAT_ICON from '@src/assets/common/icon.png';
import URL_FETTER from '@src/assets/common/item/fetter.png';
import URL_MAIN01 from '@src/assets/common/main-01.png';
import URL_MARK_ICON from '@src/assets/common/mark-icon.png';

export { URL_BG01, URL_CARD_BG, URL_CROWN, URL_FETTER, URL_MAIN01, URL_MARK_ICON, URL_STAT_ICON };

// ─── 元素 → 背景图映射 ──────────────────────────────

export const ELEM_BG: Record<string, string> = {
  火: URL_BG_PYRO,
  水: URL_BG_HYDRO,
  风: URL_BG_ANEMO,
  雷: URL_BG_ELECTRO,
  草: URL_BG_DENDRO,
  冰: URL_BG_CRYO,
  岩: URL_BG_GEO,
  物理: URL_BG_SR,
  量子: URL_BG_QUANTUM,
  虚数: URL_BG_GEO,
  pyro: URL_BG_PYRO,
  hydro: URL_BG_HYDRO,
  anemo: URL_BG_ANEMO,
  electro: URL_BG_ELECTRO,
  dendro: URL_BG_DENDRO,
  cryo: URL_BG_CRYO,
  geo: URL_BG_GEO,
  quantum: URL_BG_QUANTUM,
  sr: URL_BG_SR
};

// ─── 元素颜色 ────────────────────────────────────────

export const ELEMENT_COLORS: Record<string, string> = {
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

// ─── 星级颜色 (边框 & 文字) ──────────────────────────

export const STAR_COLORS: Record<number, string> = {
  5: '#ce8d54',
  4: '#a0a0e8',
  3: '#6ba8e8'
};

// ─── 稀有度颜色 (紫金蓝方案) ─────────────────────────

export const RARITY_COLORS: Record<number, string> = {
  5: '#c6923a',
  4: '#a256e1',
  3: '#5180cb'
};

// ─── 命座 / 星魂 背景色 ──────────────────────────────

export const CONS_COLORS: Record<number, string> = {
  0: '#666666',
  1: '#5cbac2',
  2: '#339d61',
  3: '#3e95b9',
  4: '#3955b7',
  5: '#531ba9',
  6: '#ff5722'
};

// ─── 命座后缀 ────────────────────────────────────────

export const CONS_SUFFIX: Record<string, string> = {
  gs: '命',
  sr: '魂'
};

// ─── 游戏主题色 ──────────────────────────────────────

export const GAME_ACCENT: Record<string, string> = {
  gs: '#e8d5b0',
  sr: '#c5b4e3',
  zzz: '#b4e3c5'
};

// ─── 暗色主题背景 ────────────────────────────────────

export const DARK_BG = 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)';

// ─── 旧版 .cont 面板容器风格 ─────────────────────────

/** 与老版本一致的 .cont 区块样式 (card-bg 横向铺排，圆角，阴影) */
export function contStyle(extra?: React.CSSProperties): React.CSSProperties {
  return {
    borderRadius: '10px',
    background: `url(${URL_CARD_BG}) top left repeat-x`,
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

/** .cont-title 区块标题 */
export function contTitleStyle(extra?: React.CSSProperties): React.CSSProperties {
  return {
    background: 'rgba(0,0,0,0.4)',
    boxShadow: '0 0 1px 0 #fff',
    color: '#d3bc8e',
    padding: '10px 20px',
    textAlign: 'left' as const,
    borderRadius: '10px 10px 0 0',
    fontWeight: 'bold',
    ...extra
  };
}

/** 好感（fetter）精灵图定位 (10帧横向) */
export function fetterStyle(level: number, size = 32): React.CSSProperties {
  const pct = level <= 0 ? 0 : ((Math.min(level, 10) - 1) / 9) * 100;

  return {
    width: `${size}px`,
    height: `${size}px`,
    display: 'inline-block',
    backgroundImage: `url(${URL_FETTER})`,
    backgroundSize: 'auto 100%',
    backgroundPosition: `${pct}% 0`
  };
}

/** 属性 icon 精灵图 (icon.png, 16px 每格) */
export function statIconStyle(key: string): React.CSSProperties {
  const map: Record<string, number> = {
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
    backgroundImage: `url(${URL_STAT_ICON})`,
    backgroundSize: 'auto 16px',
    backgroundPosition: `-${idx * 16}px 0`,
    verticalAlign: 'middle',
    marginRight: '4px'
  };
}

/** 排名icon (mark-icon.png, 横向2帧) */
export function rankIconStyle(type: 'dmg' | 'mark'): React.CSSProperties {
  return {
    width: '16px',
    height: '16px',
    display: 'inline-block',
    backgroundImage: `url(${URL_MARK_ICON})`,
    backgroundSize: 'auto 100%',
    backgroundPosition: type === 'mark' ? '100% 0' : '0 0',
    verticalAlign: 'bottom',
    marginRight: '3px'
  };
}

// ─── 字体栈 ──────────────────────────────────────────

export const FONT_FAMILY = '"HYWH", "tttgbnumber", "PingFang SC", system-ui, sans-serif';

/** NZBZ 粗体标题字体 (用于角色名、标题等) */
export const FONT_NZBZ = '"NZBZ", "HYWH", "tttgbnumber", system-ui, sans-serif';

// ─── 日期格式化 ──────────────────────────────────────

import dayjs from 'dayjs';

export function formatDate(): string {
  return dayjs().format('YYYY-MM-DD HH:mm');
}

export function formatDateZh(): string {
  return dayjs().format('YYYY/M/D HH:mm:ss');
}
