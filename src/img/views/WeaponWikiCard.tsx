/**
 * 武器图鉴卡片 — 展示武器详细信息
 */
import React from 'react';
import HTML from './HTML.js';
import { contStyle, contTitleStyle, elemBgUrl, FONT_FAMILY, FONT_NZBZ, RARITY_COLORS } from './shared.js';

export interface WeaponWikiData {
  name: string;
  rarity: number;
  weaponType: string;
}

const WEAPON_TYPE_ICONS: Record<string, string> = {
  单手剑: '🗡️',
  双手剑: '⚔️',
  长柄武器: '🔱',
  弓: '🏹',
  法器: '📖',
  光锥: '💿'
};

/** 武器基础属性模板 */
const BASE_STAT_LABELS = [
  { label: '基础攻击力', placeholder: '-' },
  { label: '副属性', placeholder: '-' },
  { label: '最高等级', placeholder: 'Lv.90' }
];

function StarRow({ rarity }: { rarity: number }) {
  const color = RARITY_COLORS[rarity] ?? '#888';

  return (
    <div style={{ display: 'flex', gap: '2px', marginTop: '4px' }}>
      {Array.from({ length: rarity }).map((_, i) => (
        <span key={i} style={{ fontSize: '20px', color, textShadow: `0 0 4px ${color}` }}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function WeaponWikiCard({ data }: { data: WeaponWikiData }) {
  const rarityColor = RARITY_COLORS[data.rarity] ?? '#ccc';

  return (
    <HTML style={{ width: '500px' }}>
      <div
        style={{
          fontFamily: FONT_FAMILY,
          color: '#fff',
          backgroundImage: `url(${elemBgUrl()})`,
          backgroundSize: 'cover',
          backgroundPosition: 'left top',
          position: 'relative',
          paddingBottom: '10px'
        }}
      >
        {/* 头部 */}
        <div style={{ position: 'relative', padding: '24px 20px 12px' }}>
          <div style={{ fontFamily: FONT_NZBZ, fontSize: '30px', color: '#d3bc8e' }}>{data.name}</div>
          <StarRow rarity={data.rarity} />
          <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
            <span
              style={{
                padding: '3px 12px',
                borderRadius: '12px',
                background: `${rarityColor}60`,
                fontSize: '13px',
                fontWeight: 'bold'
              }}
            >
              {WEAPON_TYPE_ICONS[data.weaponType] ?? '🔧'} {data.weaponType}
            </span>
            <span
              style={{
                padding: '3px 12px',
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.1)',
                fontSize: '13px',
                color: rarityColor
              }}
            >
              {'★'.repeat(data.rarity)}
            </span>
          </div>
        </div>

        {/* 基础属性 */}
        <div style={contStyle()}>
          <div style={contTitleStyle()}>
            <span style={{ fontFamily: FONT_NZBZ, fontSize: '15px' }}>基础属性</span>
          </div>
          <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
            {BASE_STAT_LABELS.map((s, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '7px 14px',
                  background: 'rgba(0,0,0,0.15)',
                  borderRadius: '6px'
                }}
              >
                <span style={{ fontSize: '13px', opacity: 0.7 }}>{s.label}</span>
                <span style={{ fontSize: '13px', fontWeight: 'bold' }}>{s.placeholder}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 武器技能 */}
        <div style={contStyle()}>
          <div style={contTitleStyle()}>
            <span style={{ fontFamily: FONT_NZBZ, fontSize: '15px' }}>武器技能</span>
          </div>
          <div style={{ padding: '14px 16px' }}>
            <div
              style={{
                padding: '12px',
                background: 'rgba(0,0,0,0.15)',
                borderRadius: '8px',
                fontSize: '13px',
                lineHeight: '1.6',
                opacity: 0.6,
                textAlign: 'center'
              }}
            >
              武器详细数据收录中，敬请期待
            </div>
          </div>
        </div>

        {/* 突破材料 */}
        <div style={contStyle()}>
          <div style={contTitleStyle()}>
            <span style={{ fontFamily: FONT_NZBZ, fontSize: '15px' }}>突破材料</span>
          </div>
          <div style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {['武器突破材料', '精英怪物掉落', '普通怪物掉落'].map((mat, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '6px 10px',
                  background: 'rgba(0,0,0,0.15)',
                  borderRadius: '6px'
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    background: 'rgba(0,0,0,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    flexShrink: 0
                  }}
                >
                  📦
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 'bold' }}>{mat}</div>
                  <div style={{ fontSize: '11px', opacity: 0.4 }}>详细数据收录中</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 底栏 */}
        <div style={{ position: 'relative', textAlign: 'right', padding: '8px 20px', fontSize: '12px', opacity: 0.4 }}>Miao By ALemonJS</div>
      </div>
    </HTML>
  );
}
