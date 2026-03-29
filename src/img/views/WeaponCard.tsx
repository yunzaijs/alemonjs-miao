/**
 * 武器列表卡片 — 展示角色装备的武器信息
 * 修复 alemonjs-mhy WeaponCard 中 data.avatars undefined 的问题
 */
import React from 'react';
import HTML from './HTML.js';
import { FONT_FAMILY, FONT_NZBZ, RARITY_COLORS, STAR_COLORS, contStyle } from './shared.js';

// ─── 数据类型 ────────────────────────────────────────

interface WeaponInfo {
  id: number;
  name: string;
  type: number;
  rarity: number;
  level: number;
  promote_level: number;
  affix_level: number;
  icon: string;
}

interface AvatarWithWeapon {
  id: number;
  name: string;
  rarity: number;
  icon: string;
  weapon: WeaponInfo;
}

export interface WeaponCardData {
  uid: string;
  avatars: AvatarWithWeapon[];
  filterText: string;
}

// ─── 主组件 ──────────────────────────────────────────

export default function WeaponCard({ data }: { data: WeaponCardData }) {
  const { uid, avatars = [], filterText } = data;

  let list = avatars.filter(a => a.weapon && a.weapon.rarity > 1);

  let filterRarity = 0;

  if (/五星|5星/.test(filterText)) {
    filterRarity = 5;
  } else if (/四星|4星/.test(filterText)) {
    filterRarity = 4;
  }

  if (filterRarity > 0) {
    list = list.filter(a => a.weapon.rarity === filterRarity);
  }

  list.sort((a, b) => {
    const diff = b.weapon.rarity - a.weapon.rarity;

    if (diff !== 0) {
      return diff;
    }

    const lvDiff = b.weapon.level - a.weapon.level;

    if (lvDiff !== 0) {
      return lvDiff;
    }

    return b.weapon.affix_level - a.weapon.affix_level;
  });

  const count5 = list.filter(a => a.weapon.rarity === 5).length;
  const count4 = list.filter(a => a.weapon.rarity === 4).length;
  const countOther = list.filter(a => a.weapon.rarity <= 3).length;
  const filterLabel = filterRarity > 0 ? ` · ${filterRarity}星` : '';

  return (
    <HTML style={{ width: '600px' }}>
      <div
        style={{
          fontFamily: FONT_FAMILY,
          color: '#fff',
          backgroundColor: '#2a3860',
          position: 'relative',
          paddingBottom: '10px'
        }}
      >
        {/* head-box */}
        <div
          style={{
            display: 'flex',
            padding: '20px 20px 10px',
            justifyContent: 'space-between',
            alignItems: 'flex-end'
          }}
        >
          <div>
            <div style={{ fontFamily: FONT_NZBZ, fontSize: '36px', textShadow: '0 0 3px rgba(0,0,0,0.5)' }}>武器一览{filterLabel}</div>
            <div style={{ fontSize: '14px', opacity: 0.6, marginTop: '2px' }}>
              五星{count5} · 四星{count4}
              {countOther > 0 ? ` · 其他${countOther}` : ''}
            </div>
          </div>
          <div style={{ fontSize: '14px', opacity: 0.5 }}>UID:{uid}</div>
        </div>

        {/* 武器列表 */}
        <div style={contStyle()}>
          {list.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '30px 0', color: '#999', fontSize: '14px' }}>暂无武器数据</div>
          ) : (
            <div style={{ padding: '8px 10px' }}>
              {list.map((a, i) => {
                const w = a.weapon;
                const starColor = STAR_COLORS[w.rarity] ?? '#808080';
                const rarityColor = RARITY_COLORS[w.rarity] ?? '#ccc';

                return (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '6px 4px',
                      borderBottom: i < list.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                      gap: '8px'
                    }}
                  >
                    {/* 武器图标 */}
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '6px',
                        border: `2px solid ${starColor}`,
                        overflow: 'hidden',
                        flexShrink: 0,
                        background: 'rgba(0,0,0,0.3)'
                      }}
                    >
                      <img src={w.icon} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    {/* 武器信息 */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '14px', fontWeight: 'bold', color: rarityColor }}>{w.name}</span>
                        <span
                          style={{
                            fontSize: '11px',
                            padding: '1px 5px',
                            borderRadius: '3px',
                            background: w.affix_level >= 4 ? '#ff5722' : '#62a8ea',
                            color: '#fff'
                          }}
                        >
                          精{w.affix_level}
                        </span>
                      </div>
                      <div style={{ fontSize: '12px', color: '#aaa', marginTop: '2px' }}>Lv.{w.level}</div>
                    </div>

                    {/* 装备角色 */}
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontSize: '12px', color: '#ccc' }}>→ {a.name}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 底栏 */}
        <div
          style={{
            textAlign: 'right',
            padding: '8px 20px',
            fontSize: '12px',
            opacity: 0.4
          }}
        >
          Miao By ALemonJS
        </div>
      </div>
    </HTML>
  );
}
