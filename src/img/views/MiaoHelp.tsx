/**
 * MiaoHelp #喵喵帮助
 * 对齐老版 help/index 模板: 830px, bg-01.jpg 背景, main-01.png 叠加,
 * head-box 标题, cont-box 分组, 3列 table 布局, icon精灵图
 */
import ICON_URL from '@src/assets/help/icon.png';
import React from 'react';
import HTML from './HTML.js';
import { FONT_FAMILY, FONT_NZBZ, URL_BG01, URL_MAIN01 } from './shared.js';

/** 对齐老版 default 主题配色 */
const STYLE = {
  fontColor: '#ceb78b',
  descColor: '#eee',
  headerColor: '#00008e',
  contBg: 'rgba(6, 21, 31, .5)',
  contBgBlur: 3,
  headerBg: 'rgba(6, 21, 31, .4)',
  rowBg1: 'rgba(6, 21, 31, .2)',
  rowBg2: 'rgba(6, 21, 31, .35)'
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
 * 帮助分组 — 与 router.ts 已注册路由保持一致
 */
const HELP_LIST: HelpGroup[] = [
  {
    group: '面板与数据查询',
    list: [
      { icon: 63, title: '#面板 #更新面板', desc: '查看已获取面板的角色列表' },
      { icon: 66, title: '#角色名面板 #角色名伤害', desc: '查看角色详细面板及伤害' },
      { icon: 65, title: '#圣遗物列表 #角色名圣遗物', desc: '查看圣遗物列表或角色遗器评分' },
      { icon: 62, title: '#练度统计 #角色统计', desc: '查看角色练度统计' },
      { icon: 61, title: '#角色卡片', desc: '查看你的角色卡片' },
      { icon: 67, title: '#卡片 #原神卡片 #星铁卡片', desc: '查看游戏 UID 卡片' }
    ]
  },
  {
    group: '深渊与挑战',
    list: [
      { icon: 64, title: '#深渊 #本期深渊', desc: '查看深渊/混沌回忆数据' },
      { icon: 64, title: '#幻想真境剧诗', desc: '幻想真境剧诗数据' },
      { icon: 64, title: '#幽境危战', desc: '幽境危战数据' },
      { icon: 77, title: '#深渊出场率 #深渊使用率', desc: '查看深渊角色出场/使用统计' },
      { icon: 78, title: '#角色持有率 #角色命座', desc: '查看角色持有率、命座分布' },
      { icon: 78, title: '#月谕圣牌 #幻想卡片', desc: '查看月谕圣牌/幻想卡片' }
    ]
  },
  {
    group: '资料与图鉴',
    list: [
      { icon: 53, title: '#角色名天赋 #角色名命座', desc: '查看角色天赋、命座、星魂资料' },
      { icon: 20, title: '#角色名攻略', desc: '查看角色攻略' },
      { icon: 58, title: '#角色名图鉴', desc: '查看角色图鉴信息' },
      { icon: 67, title: '#武器 #五星武器 #四星武器', desc: '查看武器列表' },
      { icon: 67, title: '#武器名武器图鉴', desc: '查看武器/光锥图鉴详情' },
      { icon: 55, title: '#角色名素材', desc: '查看角色升级所需素材' },
      { icon: 83, title: '#今日素材 #明日素材', desc: '查看今日/明日素材' },
      { icon: 83, title: '#日历 #原神日历', desc: '查看活动日历' },
      { icon: 88, title: '#角色名在哪', desc: '查看地图资源位置' }
    ]
  },
  {
    group: '老婆/老公与排行',
    list: [
      { icon: 59, title: '#老婆 #老公', desc: '查看老婆、老公' },
      { icon: 60, title: '#老婆设置心海,雷神', desc: '设置老婆列表' },
      { icon: 88, title: '#老婆照片 #甘雨照片', desc: '查看指定角色图片' },
      { icon: 78, title: '#角色名排行 #双爆排行', desc: '查看角色群内排名' },
      { icon: 55, title: '#最强角色名', desc: '查看群内最强角色面板' }
    ]
  },
  {
    group: '抽卡与卡池',
    list: [
      { icon: 6, title: '#抽卡记录 #角色池记录', desc: '查看抽卡记录分析' },
      { icon: 21, title: '#抽卡统计 #角色池统计', desc: '查看抽卡统计数据' },
      { icon: 8, title: '#角色卡池 #武器卡池', desc: '查看复刻卡池历史统计' },
      { icon: 74, title: '戳一戳', desc: '戳一戳发送随机角色卡片' }
    ]
  },
  {
    group: '管理命令，仅管理员可用',
    list: [
      { icon: 85, title: '#开启排名 #关闭排名', desc: '开启或关闭群内排名功能' },
      { icon: 32, title: '#喵喵设置', desc: '配置喵喵功能' },
      { icon: 60, title: '#上传面板图 #删除面板图', desc: '管理角色面板图素材' },
      { icon: 79, title: '#喵喵帮助 #喵喵版本', desc: '查看帮助与版本信息' }
    ]
  }
];

const COL_COUNT = 3;

/** 生成icon精灵图的CSS定位 — 对齐老版 .help-icon */
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
            padding: '12px 0 12px 50px',
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
              <strong style={{ display: 'block', color: STYLE.fontColor, fontSize: '16px', lineHeight: '24px' }}>{item.title}</strong>
              <span style={{ display: 'block', fontSize: '13px', lineHeight: '18px', color: STYLE.descColor }}>{item.desc}</span>
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
      {/* 对齐老版 body 背景 bg-01.jpg */}
      <div
        style={{
          width: '830px',
          fontFamily: FONT_FAMILY,
          color: '#fff',
          minHeight: '400px',
          backgroundImage: `url(${URL_BG01})`,
          backgroundSize: '100% auto',
          backgroundRepeat: 'repeat-y',
          position: 'relative'
        }}
      >
        {/* 对齐老版 .container 背景 main-01.png */}
        <div
          style={{
            width: '830px',
            backgroundImage: `url(${URL_MAIN01})`,
            backgroundPosition: 'top left',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% auto',
            paddingBottom: '20px'
          }}
        >
          {/* 标题区 — 对齐老版 head-box */}
          <div style={{ paddingBottom: '0', padding: '0 30px' }}>
            <div
              style={{
                fontSize: '50px',
                fontWeight: 'bold',
                fontFamily: FONT_NZBZ,
                color: STYLE.fontColor,
                textShadow: '0 0 1px rgba(6,21,31,.9)',
                lineHeight: '1.2'
              }}
            >
              喵喵帮助
            </div>
            <div
              style={{
                fontSize: '16px',
                color: STYLE.headerColor,
                marginTop: '4px',
                opacity: 0.8
              }}
            >
              AlemonJS & Miao By ALemonJS
            </div>
          </div>

          {/* 分组列表 — 对齐老版 cont-box */}
          <div style={{ padding: '0 15px' }}>
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
                    backdropFilter: `blur(${STYLE.contBgBlur}px)`,
                    position: 'relative'
                  }}
                >
                  {/* 分组标题 — 对齐老版 .help-group */}
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
                  {/* 表格 — 对齐老版 .help-table */}
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
      </div>
    </HTML>
  );
}
