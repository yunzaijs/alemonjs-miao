/**
 * 角色素材卡片 — 展示角色培养所需素材
 */
import React from 'react';
import HTML from './HTML.js';
import { contStyle, contTitleStyle, ELEM_BG, ELEMENT_COLORS, FONT_FAMILY, FONT_NZBZ, RARITY_COLORS } from './shared.js';

export interface CharMaterialData {
  name: string;
  abbr: string;
  element: string;
  rarity: number;
  weaponType: string;
  faceImg?: string;
}

const WEAPON_ICONS: Record<string, string> = {
  单手剑: '🗡️',
  双手剑: '⚔️',
  长柄武器: '🔱',
  弓: '🏹',
  法器: '📖'
};

/** 通用素材类型 */
const MATERIAL_CATEGORIES = [
  { label: '角色突破素材', icon: '💎', items: ['角色突破宝石', '区域特产', 'Boss掉落素材', '普通怪物掉落'] },
  { label: '天赋培养素材', icon: '📚', items: ['天赋培养书', '周本Boss素材', '普通怪物掉落'] },
  { label: '武器突破素材', icon: '⚔️', items: ['武器突破材料', '精英怪物掉落', '普通怪物掉落'] }
];

function StarRow({ rarity }: { rarity: number }) {
  const color = RARITY_COLORS[rarity] ?? '#888';

  return (
    <div style={{ display: 'flex', gap: '2px', marginTop: '4px' }}>
      {Array.from({ length: rarity }).map((_, i) => (
        <span key={i} style={{ fontSize: '16px', color, textShadow: `0 0 4px ${color}` }}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function CharMaterialCard({ data }: { data: CharMaterialData }) {
  const elemColor = ELEMENT_COLORS[data.element] ?? '#888';
  const bgUrl = ELEM_BG[data.element] ?? ELEM_BG['风'];

  return (
    <HTML style={{ width: '500px' }}>
      <div
        style={{
          fontFamily: FONT_FAMILY,
          color: '#fff',
          backgroundImage: `url(${bgUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'left top',
          position: 'relative',
          paddingBottom: '10px'
        }}
      >
        {/* 头部 */}
        <div style={{ position: 'relative', padding: '20px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
          <div
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '10px',
              overflow: 'hidden',
              border: `3px solid ${elemColor}`,
              boxShadow: `0 0 10px ${elemColor}40`,
              flexShrink: 0,
              background: 'rgba(0,0,0,0.3)'
            }}
          >
            {data.faceImg ? (
              <img src={data.faceImg} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', opacity: 0.3 }}>
                ?
              </div>
            )}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: FONT_NZBZ, fontSize: '26px', color: '#d3bc8e' }}>{data.name}</div>
            <StarRow rarity={data.rarity} />
            <div style={{ marginTop: '6px', display: 'flex', gap: '6px' }}>
              <span style={{ padding: '2px 8px', borderRadius: '10px', background: `${elemColor}80`, fontSize: '12px', fontWeight: 'bold' }}>
                {data.element}
              </span>
              <span style={{ padding: '2px 8px', borderRadius: '10px', background: 'rgba(255,255,255,0.15)', fontSize: '12px' }}>
                {WEAPON_ICONS[data.weaponType] ?? ''} {data.weaponType}
              </span>
            </div>
          </div>
        </div>

        {/* 素材分类 */}
        {MATERIAL_CATEGORIES.map((cat, ci) => (
          <div key={ci} style={contStyle()}>
            <div style={contTitleStyle()}>
              <span style={{ fontFamily: FONT_NZBZ, fontSize: '15px' }}>
                {cat.icon} {cat.label}
              </span>
            </div>
            <div style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {cat.items.map((item, i) => (
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
                      width: '36px',
                      height: '36px',
                      borderRadius: '6px',
                      background: 'rgba(0,0,0,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px',
                      flexShrink: 0
                    }}
                  >
                    📦
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: 'bold' }}>{item}</div>
                    <div style={{ fontSize: '11px', opacity: 0.4, marginTop: '1px' }}>详细数据收录中</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* 底栏 */}
        <div style={{ position: 'relative', textAlign: 'right', padding: '8px 20px', fontSize: '12px', opacity: 0.4 }}>Miao By ALemonJS</div>
      </div>
    </HTML>
  );
}
