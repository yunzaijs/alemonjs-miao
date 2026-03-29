/**
 * 角色资料卡片 — 展示角色基础信息（元素/稀有度/武器/头像）
 */
import React from 'react';
import HTML from './HTML.js';
import { contStyle, contTitleStyle, ELEM_BG, ELEMENT_COLORS, FONT_FAMILY, FONT_NZBZ, formatDateZh, RARITY_COLORS, URL_MAIN01 } from './shared.js';

// ─── 数据类型 ────────────────────────────────────────

export interface CharWikiData {
  name: string;
  abbr: string;
  element: string;
  rarity: number;
  weaponType: string;
  faceImg?: string;
  /** wiki / talent / cons */
  mode: 'wiki' | 'talent' | 'cons';
}

// ─── 武器类型图标 ────────────────────────────────────

const WEAPON_ICONS: Record<string, string> = {
  单手剑: '🗡️',
  双手剑: '⚔️',
  长柄武器: '🔱',
  弓: '🏹',
  法器: '📖'
};

const MODE_LABELS: Record<string, string> = {
  wiki: '角色资料',
  talent: '角色天赋',
  cons: '角色命座'
};

// ─── 星级显示 ────────────────────────────────────────

function StarRow({ rarity }: { rarity: number }) {
  const color = RARITY_COLORS[rarity] ?? '#888';

  return (
    <div style={{ display: 'flex', gap: '2px', marginTop: '4px' }}>
      {Array.from({ length: rarity }).map((_, i) => (
        <span
          key={i}
          style={{
            fontSize: '18px',
            color,
            textShadow: `0 0 4px ${color}`
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

// ─── 属性行 ──────────────────────────────────────────

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 16px',
        background: 'rgba(0,0,0,0.15)',
        borderRadius: '6px'
      }}
    >
      <span style={{ fontSize: '14px', opacity: 0.7 }}>{label}</span>
      <span style={{ fontSize: '15px', fontWeight: 'bold' }}>{value}</span>
    </div>
  );
}

// ─── 主组件 ──────────────────────────────────────────

export default function CharWikiCard({ data }: { data: CharWikiData }) {
  const elemColor = ELEMENT_COLORS[data.element] ?? '#888';
  const bgUrl = ELEM_BG[data.element] ?? ELEM_BG['风'];

  return (
    <HTML>
      <div
        style={{
          width: '500px',
          fontFamily: FONT_FAMILY,
          color: '#fff',
          backgroundImage: `url(${bgUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          paddingBottom: '10px'
        }}
      >
        {/* 遮罩 */}
        <img
          src={URL_MAIN01}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            pointerEvents: 'none'
          }}
        />

        {/* 头部: 头像 + 信息 */}
        <div
          style={{
            position: 'relative',
            padding: '20px',
            display: 'flex',
            gap: '16px',
            alignItems: 'flex-start'
          }}
        >
          {/* 角色头像 */}
          <div
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '12px',
              overflow: 'hidden',
              border: `3px solid ${elemColor}`,
              boxShadow: `0 0 12px ${elemColor}40`,
              flexShrink: 0,
              background: 'rgba(0,0,0,0.3)'
            }}
          >
            {data.faceImg ? (
              <img
                src={data.faceImg}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '40px',
                  opacity: 0.3
                }}
              >
                ?
              </div>
            )}
          </div>

          {/* 名称 + 星级 */}
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: FONT_NZBZ, fontSize: '28px', color: '#d3bc8e' }}>{data.name}</div>
            {data.abbr !== data.name && <div style={{ fontSize: '13px', opacity: 0.5, marginTop: '2px' }}>{data.abbr}</div>}
            <StarRow rarity={data.rarity} />
            <div
              style={{
                marginTop: '8px',
                display: 'flex',
                gap: '8px',
                alignItems: 'center'
              }}
            >
              <span
                style={{
                  padding: '2px 10px',
                  borderRadius: '12px',
                  background: `${elemColor}80`,
                  fontSize: '13px',
                  fontWeight: 'bold'
                }}
              >
                {data.element}
              </span>
              <span
                style={{
                  padding: '2px 10px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.15)',
                  fontSize: '13px'
                }}
              >
                {WEAPON_ICONS[data.weaponType] ?? ''} {data.weaponType}
              </span>
            </div>
          </div>
        </div>

        {/* 详细信息 */}
        <div style={contStyle()}>
          <div style={contTitleStyle()}>
            <span style={{ fontFamily: FONT_NZBZ, fontSize: '16px' }}>{MODE_LABELS[data.mode]}</span>
          </div>
          <div
            style={{
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}
          >
            <InfoRow label='元素' value={data.element} />
            <InfoRow label='稀有度' value={`${'★'.repeat(data.rarity)}`} />
            <InfoRow label='武器类型' value={data.weaponType} />
            {data.mode === 'talent' && (
              <div
                style={{
                  padding: '12px 16px',
                  background: 'rgba(0,0,0,0.15)',
                  borderRadius: '6px',
                  fontSize: '13px',
                  opacity: 0.6,
                  textAlign: 'center'
                }}
              >
                天赋详细数据暂未收录，敬请期待
              </div>
            )}
            {data.mode === 'cons' && (
              <div
                style={{
                  padding: '12px 16px',
                  background: 'rgba(0,0,0,0.15)',
                  borderRadius: '6px',
                  fontSize: '13px',
                  opacity: 0.6,
                  textAlign: 'center'
                }}
              >
                命座详细数据暂未收录，敬请期待
              </div>
            )}
          </div>
        </div>

        {/* 底栏 */}
        <div
          style={{
            position: 'relative',
            textAlign: 'right',
            padding: '8px 20px',
            fontSize: '12px',
            opacity: 0.4
          }}
        >
          Created by Miao-Plugin · {formatDateZh()}
        </div>
      </div>
    </HTML>
  );
}
