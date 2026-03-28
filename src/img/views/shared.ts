/**
 * 共享设计常量与工具函数
 */

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
  0: '#8e8e8e',
  1: '#5d9e5e',
  2: '#5c85c1',
  3: '#7267b0',
  4: '#a85fa5',
  5: '#c2733a',
  6: '#d4a574'
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

// ─── 字体栈 ──────────────────────────────────────────

export const FONT_FAMILY = '"tttgbnumber", "PingFang SC", system-ui, sans-serif';

// ─── 日期格式化 ──────────────────────────────────────

export function formatDate(): string {
  const now = new Date();

  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}

export function formatDateZh(): string {
  return new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
}
