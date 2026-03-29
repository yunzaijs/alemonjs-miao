/**
 * MiaoHelp #喵喵帮助
 * 830px，3列表格布局，交替行背景，icon精灵图
 */
import ICON_URL from '@src/assets/help/icon.png';
import React from 'react';
import HTML from './HTML.js';
import { FONT_FAMILY, FONT_NZBZ } from './shared.js';

const STYLE = {
  fontColor: '#ceb78b',
  descColor: '#eee',
  contBg: 'rgba(6, 21, 31, .5)',
  headerBg: 'rgba(6, 21, 31, .4)',
  rowBg1: 'rgba(6, 21, 31, .2)',
  rowBg2: 'rgba(6, 21, 31, .35)',
  titleColor: '#d3bc8e'
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

/**
 * 与旧版保持一致的帮助菜单数据
 * 覆盖所有已实现的 25 个路由功能
 */
const HELP_LIST: HelpGroup[] = [
  {
    group: '面板与角色查询',
    list: [
      { icon: 63, title: '#面板 #更新面板', desc: '查看已获取面板信息的角色列表' },
      { icon: 66, title: '#雷神面板 #雷神详情', desc: '查看角色详细面板及圣遗物评分' },
      { icon: 65, title: '#圣遗物列表 #遗器总览', desc: '查看全部圣遗物/遗器评分列表' },
      { icon: 62, title: '#练度统计 #角色统计', desc: '角色等级、命座、武器分布统计' },
      { icon: 61, title: '#角色卡片', desc: '查看你的原神角色卡片数据' }
    ]
  },
  {
    group: '挑战数据',
    list: [
      { icon: 64, title: '#深渊 #深渊12层', desc: '深渊数据，打完请2小时后查询' },
      { icon: 64, title: '#剧诗 #幻想真境剧诗', desc: '幻想真境剧诗数据 (仅原神)' },
      { icon: 64, title: '#幽境 #幽境危战 #危战', desc: '幽境危战数据 (仅原神)' }
    ]
  },
  {
    group: '排行功能',
    list: [
      { icon: 78, title: '#刻晴排行 #甘雨双爆排行', desc: '查看角色群内排名 (圣遗物/双爆)' },
      { icon: 55, title: '#最强刻晴 #最强甘雨', desc: '查看群内最强角色面板' },
      { icon: 77, title: '#深渊出场率 #深渊使用率', desc: '查看本期深渊出场/使用统计' },
      { icon: 78, title: '#角色持有率 #命座分布', desc: '查看角色的持有率、命座统计' }
    ]
  },
  {
    group: '资料与图鉴',
    list: [
      { icon: 53, title: '#夜兰天赋 #胡桃命座', desc: '查看角色的天赋与命座资料' },
      { icon: 20, title: '#刻晴攻略', desc: '查看角色攻略图' },
      { icon: 67, title: '#今日素材 #每日材料', desc: '查看今日/明日角色天赋素材' },
      { icon: 83, title: '#日历 #素材日历', desc: '查看活动日历与材料时间表' }
    ]
  },
  {
    group: '抽卡与卡池',
    list: [
      { icon: 6, title: '#抽卡记录 #角色池记录', desc: '统计游戏抽卡数据' },
      { icon: 21, title: '#抽卡统计 #版本统计', desc: '按卡池统计抽卡数据' },
      { icon: 8, title: '#角色卡池 #武器统计', desc: '查看复刻卡池历史统计' }
    ]
  },
  {
    group: '角色互动',
    list: [
      { icon: 58, title: '#刻晴 #心海', desc: '查看原神角色卡片' },
      { icon: 59, title: '#老婆 #老公', desc: '查看你的老婆/老公' },
      { icon: 60, title: '#老婆设置心海,雷神', desc: '设置老婆列表，也可设置随机' },
      { icon: 88, title: '#老婆照片 #甘雨照片', desc: '查看指定角色的图片' },
      { icon: 74, title: '戳一戳', desc: '戳一戳发送随机角色卡片' }
    ]
  },
  {
    group: '管理命令，仅管理员可用',
    list: [
      { icon: 85, title: '#开启排名 #关闭排名', desc: '开启或关闭群内排名功能' },
      { icon: 32, title: '#重置排名', desc: '清空群内所有排名数据' },
      { icon: 60, title: '#上传面板图 #删除面板图', desc: '管理角色面板图素材' },
      { icon: 32, title: '#喵喵设置', desc: '配置喵喵功能设置' }
    ]
  }
];

const COL_COUNT = 3;

/** 生成icon精灵图的CSS定位 */
function iconStyle(icon: number): React.CSSProperties {
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
    backgroundImage: `url(${ICON_URL})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '500px auto',
    backgroundPosition: `-${x * 50}px -${y * 50}px`,
    borderRadius: '5px',
    left: '6px',
    top: '12px',
    transform: 'scale(0.85)'
  };
}

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
              <span style={iconStyle(item.icon)} />
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
            padding: '40px 30px 18px',
            textAlign: 'center'
          }}
        >
          <div
            style={{
              fontSize: '50px',
              fontWeight: 'bold',
              fontFamily: FONT_NZBZ,
              color: STYLE.fontColor,
              textShadow: '0 2px 8px rgba(0,0,0,0.5)',
              lineHeight: '1.2'
            }}
          >
            喵喵帮助
          </div>
          <div
            style={{
              fontSize: '16px',
              color: STYLE.descColor,
              marginTop: '8px',
              opacity: 0.7
            }}
          >
            AlemonJS & Miao-Plugin
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
                  boxShadow: '0 5px 10px 0 rgba(0,0,0,0.15)',
                  backdropFilter: 'blur(3px)'
                }}
              >
                <div
                  style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: STYLE.fontColor,
                    padding: '15px 15px 10px 20px',
                    background: STYLE.headerBg
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
