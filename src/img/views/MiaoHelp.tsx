/**
 * MiaoHelp #喵喵帮助
 * 830px，3列表格布局，交替行背景
 */
import React from 'react';
import HTML from './HTML.js';

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
    group: '游戏面板与信息查询',
    list: [
      { icon: 61, title: '#角色 #角色卡片 #探索', desc: '你的原神角色数据，数据来自米游社' },
      { icon: 63, title: '#面板 #更新面板', desc: '查看已经获取面板信息的角色列表' },
      { icon: 66, title: '#雷神面板 #雷神伤害', desc: '查看角色详细面板及伤害信息' },
      { icon: 65, title: '#圣遗物列表 #雷神圣遗物', desc: '查看圣遗物列表 / 评分详情' },
      { icon: 79, title: '#面板帮助', desc: '面板替换及其他帮助信息' },
      { icon: 64, title: '#深渊 #深渊12层', desc: '深渊数据，打完请2小时后查询' },
      { icon: 64, title: '#幻想 #幻想真境剧诗', desc: '幻想真境剧诗数据' },
      { icon: 55, title: '#202407幻想角色列表', desc: '幻想真境剧诗入场角色查询' },
      { icon: 35, title: '#月谕圣牌', desc: '「月谕圣牌」收藏查询' },
      { icon: 64, title: '#幽境 #幽境危战', desc: '幽境危战数据' },
      { icon: 67, title: '#五星 #武器 #今日素材', desc: '你的原神角色详情数据' },
      { icon: 62, title: '#五星列表 #练度统计', desc: '角色列表数据' },
      { icon: 77, title: '#上传深渊数据', desc: '上传您的深渊数据用于数据统计' }
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
      { icon: 56, title: '#深渊配队', desc: '根据你的角色池推荐组队' },
      { icon: 78, title: '#角色持有 #角色0命', desc: '查看角色的持有率、0命统计' },
      { icon: 77, title: '#深渊使用率 #深渊出场率', desc: '查看本期深渊使用或出场统计' },
      { icon: 20, title: '#刻晴攻略', desc: '西风驿站攻略' },
      { icon: 60, title: '#心海图鉴 #护摩', desc: '角色武器图鉴' }
    ]
  },
  {
    group: '个人信息查询及签到',
    list: [
      { icon: 15, title: '#体力 #体力帮助', desc: '查询体力，绑定Cookie帮助' },
      { icon: 5, title: '#原石 #原石统计', desc: '札记数据，需要绑定Cookie' },
      { icon: 10, title: '#uid #绑定123456789', desc: '查看绑定的uid 绑定uid' },
      { icon: 22, title: '#我的ck #删除ck', desc: '查看绑定的cookie 删除cookie' },
      { icon: 86, title: '#签到', desc: '米游社原神签到' }
    ]
  },
  {
    group: '其他查询指令',
    list: [
      { icon: 83, title: '#日历 #日历列表', desc: '查看活动日历' },
      { icon: 6, title: '#抽卡记录 #记录帮助', desc: '统计游戏抽卡数据' },
      { icon: 21, title: '#角色统计 #武器统计', desc: '按卡池统计抽卡数据' },
      { icon: 8, title: '十连 十连2 定轨', desc: '真实模拟抽卡' },
      { icon: 74, title: '添加哈哈 删除哈哈', desc: '添加表情，回复哈哈触发' },
      { icon: 79, title: '#帮助 #版本 #喵喵版本', desc: '其他命令' }
    ]
  },
  {
    group: '管理命令，仅管理员可用',
    list: [
      { icon: 85, title: '#用户统计', desc: '查看用户CK-UID列表' },
      { icon: 32, title: '#喵喵设置', desc: '配置喵喵功能' },
      { icon: 35, title: '#喵喵更新图像', desc: '更新喵喵的增量角色图像素材' }
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
          fontFamily: '"tttgbnumber", "PingFang SC", system-ui, sans-serif',
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
