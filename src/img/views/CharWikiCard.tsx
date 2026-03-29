/**
 * 角色资料卡片 — 展示角色基础信息 / 天赋 / 命座
 */
import React from 'react';
import HTML from './HTML.js';
import { contStyle, contTitleStyle, ELEM_BG, ELEMENT_COLORS, FONT_FAMILY, FONT_NZBZ, RARITY_COLORS } from './shared.js';

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

// ─── 天赋类型 ────────────────────────────────────────

const TALENT_TYPES = [
  { key: 'a', label: '普通攻击', icon: '⚔️', desc: '进行普通攻击与重击' },
  { key: 'e', label: '元素战技', icon: '🔮', desc: '施放元素战技造成元素伤害' },
  { key: 'q', label: '元素爆发', icon: '💫', desc: '施放元素爆发造成大量伤害' },
  { key: 'p1', label: '固有天赋 1', icon: '📜', desc: '角色解锁即拥有的被动天赋' },
  { key: 'p2', label: '固有天赋 2', icon: '📜', desc: '突破后解锁的被动天赋' }
];

// ─── 命座描述 ────────────────────────────────────────

const CONS_LABELS = ['第一层', '第二层', '第三层', '第四层', '第五层', '第六层'];
const CONS_ICONS = ['①', '②', '③', '④', '⑤', '⑥'];
const CONS_GRADE_COLORS = ['#5cbac2', '#339d61', '#3e95b9', '#3955b7', '#531ba9', '#ff5722'];

// ─── 星级显示 ────────────────────────────────────────

function StarRow({ rarity }: { rarity: number }) {
  const color = RARITY_COLORS[rarity] ?? '#888';

  return (
    <div style={{ display: 'flex', gap: '2px', marginTop: '4px' }}>
      {Array.from({ length: rarity }).map((_, i) => (
        <span key={i} style={{ fontSize: '18px', color, textShadow: `0 0 4px ${color}` }}>
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

// ─── 天赋区块 ────────────────────────────────────────

function TalentSection({ element }: { element: string }) {
  const elemColor = ELEMENT_COLORS[element] ?? '#888';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {TALENT_TYPES.map(t => (
        <div
          key={t.key}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 14px',
            background: 'rgba(0,0,0,0.15)',
            borderRadius: '6px',
            borderLeft: `3px solid ${elemColor}`
          }}
        >
          <span style={{ fontSize: '22px', flexShrink: 0 }}>{t.icon}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{t.label}</div>
            <div style={{ fontSize: '12px', opacity: 0.5, marginTop: '2px' }}>{t.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── 命座区块 ────────────────────────────────────────

function ConsSection() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {CONS_LABELS.map((label, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 14px',
            background: 'rgba(0,0,0,0.15)',
            borderRadius: '6px',
            borderLeft: `3px solid ${CONS_GRADE_COLORS[i]}`
          }}
        >
          <span
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: CONS_GRADE_COLORS[i],
              width: '28px',
              textAlign: 'center',
              flexShrink: 0
            }}
          >
            {CONS_ICONS[i]}
          </span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{label}</div>
            <div style={{ fontSize: '12px', opacity: 0.5, marginTop: '2px' }}>命之座 · 第{i + 1}重</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── 主组件 ──────────────────────────────────────────

export default function CharWikiCard({ data }: { data: CharWikiData }) {
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
              <img src={data.faceImg} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
            <div style={{ marginTop: '8px', display: 'flex', gap: '8px', alignItems: 'center' }}>
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

        {/* 信息区 */}
        <div style={contStyle()}>
          <div style={contTitleStyle()}>
            <span style={{ fontFamily: FONT_NZBZ, fontSize: '16px' }}>{MODE_LABELS[data.mode]}</span>
          </div>
          <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {data.mode === 'wiki' && (
              <>
                <InfoRow label='元素' value={data.element} />
                <InfoRow label='稀有度' value={`${'★'.repeat(data.rarity)}`} />
                <InfoRow label='武器类型' value={data.weaponType} />
              </>
            )}
            {data.mode === 'talent' && <TalentSection element={data.element} />}
            {data.mode === 'cons' && <ConsSection />}
          </div>
        </div>

        {/* 底栏 */}
        <div style={{ position: 'relative', textAlign: 'right', padding: '8px 20px', fontSize: '12px', opacity: 0.4 }}>Miao By ALemonJS</div>
      </div>
    </HTML>
  );
}
