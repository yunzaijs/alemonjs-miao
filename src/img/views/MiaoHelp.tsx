/**
 * MiaoHelp #喵喵帮助
 * 830px，3列表格布局，交替行背景
 */
import React from 'react';
import HTML from './HTML.js';
import { FONT_FAMILY } from './shared.js';

const STYLE = {
  fontColor: '#ceb78b',
  descColor: '#eee',
  contBg: 'rgba(6, 21, 31, .5)',
  headerBg: 'rgba(6, 21, 31, .4)',
  rowBg1: 'rgba(6, 21, 31, .2)',
  rowBg2: 'rgba(6, 21, 31, .35)',
  titleColor: '#d3bc8e'
};

const ICON_MAP: Record<number, string> = {
  5: '💎',
  6: '🎰',
  8: '🎲',
  10: '🔗',
  15: '⚡',
  20: '📖',
  21: '📊',
  22: '🍪',
  32: '⚙️',
  35: '🃏',
  53: '📚',
  55: '👥',
  56: '🛡️',
  58: '🎭',
  59: '💕',
  60: '🖼️',
  61: '👤',
  62: '📋',
  63: '📊',
  64: '⚔️',
  65: '💍',
  66: '🔍',
  67: '🗡️',
  74: '😂',
  77: '📤',
  78: '📈',
  79: '❓',
  83: '📅',
  85: '👨‍💼',
  86: '✅',
  88: '📷'
};

interface HelpItem {
  icon: number;
  title: string;
  desc: string;
}

interface HelpGroup {
  group: string;
  list: HelpItem[];
}

const HELP_LIST: HelpGroup[] = [
  {
    group: '面板与角色查询',
    list: [
      { icon: 63, title: '#面板 #更新面板', desc: '查看已获取面板信息的角色列表' },
      { icon: 66, title: '#雷神面板 #雷神详情', desc: '查看角色详细面板及圣遗物评分' },
      { icon: 65, title: '#圣遗物列表 #遗器总览', desc: '查看全部圣遗物/遗器评分列表' },
      { icon: 62, title: '#练度统计 #角色统计', desc: '角色等级、命座、武器分布统计' }
    ]
  },
  {
    group: '挑战数据',
    list: [
      { icon: 64, title: '#剧诗 #幻想真境剧诗', desc: '幻想真境剧诗数据 (仅原神)' },
      { icon: 64, title: '#幽境 #幽境危战 #危战', desc: '幽境危战数据 (仅原神)' },
      { icon: 83, title: '#日历 #素材日历', desc: '查看活动日历与今日素材' }
    ]
  },
  {
    group: '排行功能',
    list: [
      { icon: 78, title: '#刻晴排行 #甘雨双爆排行', desc: '查看角色群内排名 (圣遗物/双爆)' },
      { icon: 55, title: '#最强刻晴 #最强甘雨', desc: '查看群内最强角色面板' }
    ]
  },
  {
    group: '管理命令，仅管理员可用',
    list: [
      { icon: 85, title: '#开启排名 #关闭排名', desc: '开启或关闭群内排名功能' },
      { icon: 32, title: '#重置排名', desc: '清空群内所有排名数据' }
    ]
  }
];

const COL_COUNT = 3;

function HelpRow({ items, rowIdx }: { items: HelpItem[]; rowIdx: number }) {
  const bg = rowIdx % 2 === 0 ? STYLE.rowBg1 : STYLE.rowBg2;
  const cells: (HelpItem | null)[] = [...items];

  while (cells.length < COL_COUNT) {
    cells.push(null);
  }

  return (
    <div style={{ display: 'table-row', background: bg }}>
      {cells.map((item, ci) => (
        <div
          key={ci}
          style={{
            display: 'table-cell',
            padding: '12px 10px 12px 50px',
            lineHeight: '24px',
            fontSize: '14px',
            position: 'relative',
            textAlign: 'left',
            boxShadow: '0 0 1px 0 #888 inset',
            width: `${100 / COL_COUNT}%`,
            verticalAlign: 'top'
          }}
        >
          {item && (
            <>
              <span
                style={{
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  left: '6px',
                  top: '12px',
                  borderRadius: '5px',
                  fontSize: '22px',
                  background: 'rgba(255,255,255,0.08)'
                }}
              >
                {ICON_MAP[item.icon] ?? '📌'}
              </span>
              <strong
                style={{
                  display: 'block',
                  color: STYLE.titleColor,
                  fontSize: '16px',
                  lineHeight: '24px'
                }}
              >
                {item.title}
              </strong>
              <span
                style={{
                  display: 'block',
                  fontSize: '13px',
                  lineHeight: '18px',
                  color: STYLE.descColor
                }}
              >
                {item.desc}
              </span>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default function MiaoHelp() {
  return (
    <HTML style={{ width: '830px' }}>
      <div
        style={{
          padding: '0',
          fontFamily: FONT_FAMILY,
          color: '#fff',
          minHeight: '400px',
          background: '#0a1628'
        }}
      >
        {/* 标题区 */}
        <div
          style={{
            background: STYLE.headerBg,
            padding: '40px 30px 24px',
            textAlign: 'center'
          }}
        >
          <div
            style={{
              fontSize: '50px',
              fontWeight: 'bold',
              color: '#fff',
              textShadow: '0 2px 8px rgba(0,0,0,0.5)',
              lineHeight: '1.2'
            }}
          >
            喵喵帮助
          </div>
        </div>

        {/* 分组列表 */}
        <div style={{ padding: '0 15px 20px' }}>
          {HELP_LIST.map((group, gi) => {
            const rows: HelpItem[][] = [];

            for (let i = 0; i < group.list.length; i += COL_COUNT) {
              rows.push(group.list.slice(i, i + COL_COUNT));
            }

            return (
              <div
                key={gi}
                style={{
                  background: STYLE.contBg,
                  borderRadius: '15px',
                  marginTop: '20px',
                  marginBottom: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 5px 10px 0 rgba(0,0,0,0.15)'
                }}
              >
                <div
                  style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: STYLE.fontColor,
                    padding: '15px 15px 10px 20px'
                  }}
                >
                  {group.group}
                </div>
                <div
                  style={{
                    display: 'table',
                    width: '100%',
                    borderCollapse: 'collapse',
                    borderRadius: '0 0 10px 10px',
                    overflow: 'hidden'
                  }}
                >
                  {rows.map((rowItems, ri) => (
                    <HelpRow key={ri} items={rowItems} rowIdx={ri} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </HTML>
  );
}
