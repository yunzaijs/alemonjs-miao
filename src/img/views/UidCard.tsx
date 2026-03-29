/**
 * UID 信息卡片 — 对齐老版 avatar-list 模板
 * 展示: 用户横幅 / 统计 / 探索度 / 宝箱 / 角色列表
 */
import React from 'react';
import HTML from './HTML.js';
import { CONS_COLORS, contStyle, contTitleStyle, elemBgUrl, FONT_FAMILY, FONT_NZBZ, URL_ITEM_BG4, URL_ITEM_BG5 } from './shared.js';

// ─── 数据类型 ────────────────────────────────────────

export interface UidStats {
  activeDay?: number;
  achievement?: number;
  wayPoint?: number; // 锚点
  avatar?: number;
  avatar5?: number; // 五星角色数
  goldCount?: number; // 金卡总数
  commonChest?: number;
  exquisiteChest?: number;
  preciousChest?: number;
  luxuriousChest?: number;
  magicChest?: number;
}

export interface UidExploration {
  name: string;
  pct: number; // 探索度百分比 (0~100)
}

export interface UidAvatar {
  id: number;
  name: string;
  element: string;
  level: number;
  rarity: number;
  cons: number;
  fetter: number;
  icon: string;
}

export interface UidCardData {
  uid: string;
  game: string;
  nickname: string;
  level: number;
  /** 是否为自有Cookie */
  isSelfCk: boolean;
  stats: UidStats;
  exploration: UidExploration[];
  avatars: UidAvatar[];
}

// ─── 活跃天数格式化 ──────────────────────────────────

function formatActiveDay(num?: number): string {
  if (!num) { return ''; }
  const year = Math.floor(num / 365);
  const month = Math.floor((num % 365) / 30.41);
  const day = Math.floor((num % 365) % 30.41);
  let msg = '';

  if (year > 0) { msg += `${year}年`; }
  if (month > 0) { msg += `${month}个月`; }
  if (day > 0) { msg += `${day}天`; }

  return msg;
}

// ─── 宝箱配置 ────────────────────────────────────────

const CHEST_MAP = [
  { key: 'commonChest', title: '普通', max: 2807 },
  { key: 'exquisiteChest', title: '精致', max: 1245 },
  { key: 'preciousChest', title: '珍贵', max: 638 },
  { key: 'luxuriousChest', title: '华丽', max: 282 },
  { key: 'magicChest', title: '奇馈', max: 145 }
] as const;

// ─── 统计栏 key → 标题 ──────────────────────────────

const STAT_ITEMS: Array<{ key: keyof UidStats; label: string }> = [
  { key: 'achievement', label: '成就' },
  { key: 'wayPoint', label: '锚点' },
  { key: 'avatar', label: '角色' },
  { key: 'avatar5', label: '五星角色' },
  { key: 'goldCount', label: '金卡总数' }
];

// ─── 主组件 ──────────────────────────────────────────

export default function UidCard({ data }: { data: UidCardData }) {
  const { uid, nickname, level, stats, exploration, avatars, isSelfCk } = data;
  const activeDayStr = formatActiveDay(stats.activeDay);
  const hasStat = STAT_ITEMS.some(s => stats[s.key]);
  const hasExploration = exploration.length > 0;
  const hasChest = !!stats.commonChest;

  return (
    <HTML style={{ width: '740px' }}>
      <div
        style={{
          fontFamily: FONT_FAMILY,
          color: '#fff',
          backgroundImage: `url(${elemBgUrl(avatars[0]?.element)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'left top',
          position: 'relative',
          paddingBottom: '10px'
        }}
      >
        {/* ── 用户横幅 — 对齐老版 .user-banner ── */}
        <div
          style={{
            height: '90px',
            backgroundColor: '#f0ece4',
            borderRadius: '50px',
            padding: '1px',
            margin: '5px 0',
            display: 'flex',
            position: 'relative',
            whiteSpace: 'nowrap'
          }}
        >
          {/* 头像 */}
          <div
            style={{
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
            }}
          >
            {avatars[0]?.icon && <img src={avatars[0].icon} style={{ width: '64px', height: '64px', objectFit: 'cover' }} />}
          </div>

          {/* 名片区 */}
          <div style={{ padding: '15px 5px', color: '#414e64', textShadow: '0 0 2px #f0ece4, 0 0 5px #f0ece4' }}>
            <div style={{ height: '34px', lineHeight: '34px' }}>
              <strong style={{ fontSize: '24px' }}>{nickname || `#${uid}`}</strong>
              {level > 1 && <span style={{ paddingLeft: '5px' }}>Lv.{level}</span>}
            </div>
            <div style={{ height: '22px', lineHeight: '22px', fontSize: '16px' }}>
              <span>#{uid}</span>
              {activeDayStr && <span style={{ paddingLeft: '8px' }}>{activeDayStr}</span>}
            </div>
          </div>

          {/* 统计指标 — 对齐老版 .stat */}
          {hasStat && (
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                display: 'flex',
                margin: '16px',
                borderRadius: '29px',
                height: '58px',
                boxShadow: '0 0 5px 0 rgba(0,0,0,0.4)',
                overflow: 'hidden'
              }}
            >
              {STAT_ITEMS.filter(s => stats[s.key]).map((s, i, arr) => (
                <div
                  key={s.key}
                  style={{
                    padding: '7px',
                    width: i === 0 || i === arr.length - 1 ? '80px' : '70px',
                    paddingLeft: i === 0 ? '17px' : '7px',
                    paddingRight: i === arr.length - 1 ? '17px' : '7px',
                    height: '58px',
                    textAlign: 'center',
                    textShadow: '0 0 1px #fff',
                    background: i % 2 === 0 ? 'rgba(255,255,255,0.65)' : 'rgba(220,220,220,0.5)'
                  }}
                >
                  <strong style={{ fontSize: '22px', display: 'block', color: '#414e64' }}>{stats[s.key]}</strong>
                  <span style={{ display: 'block', fontSize: '14px', color: '#414e64' }}>{s.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CK 提示 */}
        {!isSelfCk && (
          <div
            style={{
              textAlign: 'center',
              color: 'rgba(255,255,255,0.9)',
              fontSize: '13px',
              padding: '4px 15px'
            }}
          >
            未绑定CK或CK失效，信息可能不完全。发送<strong style={{ color: '#d3bc8e', fontWeight: 'normal', padding: '0 2px' }}>#体力帮助</strong>查看CK绑定方法
          </div>
        )}

        {/* ── 探索度 — 对齐老版 .exploration ── */}
        {hasExploration && (
          <div style={{ display: 'flex', flexWrap: 'wrap', margin: '10px 0', justifyContent: 'center' }}>
            {exploration.map((city, idx) => (
              <div
                key={idx}
                style={{
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
                }}
              >
                <span style={{ marginTop: '53px', fontSize: '13px', height: '16px', lineHeight: '16px', textShadow: '0 0 1px rgba(0,0,0,0.5)' }}>
                  {city.name}
                </span>
                <strong
                  style={{
                    fontSize: '20px',
                    height: '30px',
                    lineHeight: '30px',
                    textShadow: '0 0 1px #000, 1px 1px 3px rgba(0,0,0,0.5)',
                    fontWeight: 'normal'
                  }}
                >
                  {city.pct}%
                </strong>
              </div>
            ))}
          </div>
        )}

        {/* ── 宝箱 — 对齐老版 .chest-list ── */}
        {hasChest && (
          <div
            style={{
              ...contStyle(),
              background: 'rgba(0,0,0,0.6)',
              padding: '0 15px',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            {CHEST_MAP.map((cfg, idx) => {
              const val = (stats as Record<string, number | undefined>)[cfg.key] ?? 0;
              const max = cfg.max > val ? cfg.max : val;

              return (
                <div
                  key={cfg.key}
                  style={{ width: '20%', display: 'flex', padding: '15px 0', background: idx % 2 === 1 ? 'rgba(50,50,50,0.5)' : 'transparent' }}
                >
                  <div
                    style={{
                      fontSize: '24px',
                      lineHeight: '40px',
                      height: '40px',
                      paddingRight: '8px',
                      textAlign: 'right',
                      width: '70px',
                      textShadow: '0 0 1px #000, 1px 1px 3px rgba(0,0,0,0.5)'
                    }}
                  >
                    {val}
                  </div>
                  <div style={{ width: '60px', height: '40px', fontSize: '14px' }}>
                    <div style={{ display: 'flex', height: '20px', lineHeight: '20px' }}>
                      <div style={{ paddingLeft: '3px', color: '#aaa' }}>{max}</div>
                    </div>
                    <div style={{ height: '20px', color: '#d3bc8e' }}>{cfg.title}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── 角色列表 — 对齐老版 .avatar-cont ── */}
        {avatars.length > 0 && (
          <div style={{ ...contStyle(), background: 'rgba(0,0,0,0.5)', padding: 0, margin: '10px 0' }}>
            <div style={contTitleStyle()}>
              <span style={{ fontFamily: FONT_NZBZ, fontSize: '15px' }}>角色列表</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', padding: '8px' }}>
              {avatars.map(av => {
                const rarityBg = av.rarity === 5 ? URL_ITEM_BG5 : URL_ITEM_BG4;
                const consBg = CONS_COLORS[av.cons] ?? CONS_COLORS[0];

                return (
                  <div
                    key={av.id}
                    style={{
                      width: '62px',
                      margin: '5px',
                      backgroundColor: '#e7e5d9',
                      borderRadius: '5px',
                      overflow: 'hidden',
                      fontSize: '10px',
                      textAlign: 'center',
                      color: '#333'
                    }}
                  >
                    <div style={{ width: '62px', height: '62px', backgroundImage: `url(${rarityBg})`, backgroundSize: '100% 100%', position: 'relative' }}>
                      {av.icon && <img src={av.icon} style={{ width: '62px', height: '62px', objectFit: 'cover' }} />}
                      {/* 命座角标 */}
                      <span
                        style={{
                          position: 'absolute',
                          right: '1px',
                          bottom: '1px',
                          background: consBg,
                          color: '#fff',
                          fontSize: '9px',
                          padding: '1px 4px',
                          borderRadius: '3px',
                          lineHeight: '12px'
                        }}
                      >
                        {av.cons}
                        {data.game === 'sr' ? '魂' : '命'}
                      </span>
                      {/* 等级 */}
                      <span
                        style={{
                          position: 'absolute',
                          left: '1px',
                          bottom: '1px',
                          background: 'rgba(0,0,0,0.5)',
                          color: '#fff',
                          fontSize: '9px',
                          padding: '1px 3px',
                          borderRadius: '3px',
                          lineHeight: '12px'
                        }}
                      >
                        Lv.{av.level}
                      </span>
                    </div>
                    <div style={{ padding: '3px 1px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{av.name}</div>
                  </div>
                );
              })}
            </div>
            <div style={{ textAlign: 'right', padding: '4px 15px 8px', fontSize: '12px', color: '#aaa' }}>共 {avatars.length} 个角色</div>
          </div>
        )}

        {/* 底栏 */}
        <div style={{ position: 'relative', textAlign: 'right', padding: '8px 20px', fontSize: '12px', opacity: 0.4 }}>Miao By ALemonJS</div>
      </div>
    </HTML>
  );
}
