/**
 * 群内最强卡片 — 显示某角色的群内第一名详情
 */
import { scoreCharacterArtifacts } from '@src/model/miao/artisMark.js';
import type { ProfileAvatar } from '@src/model/miao/enka.js';
import React from 'react';
import HTML from './HTML.js';
import { DARK_BG, ELEMENT_COLORS, FONT_FAMILY, formatDateZh, STAR_COLORS } from './shared.js';

// ─── 主组件 ──────────────────────────────────────────

export interface GroupTopData {
  game: string;
  uid: string;
  avatar: ProfileAvatar;
  rank: number;
  type: string;
}

interface Props {
  data: GroupTopData;
}

const TYPE_LABELS: Record<string, string> = {
  mark: '圣遗物评分',
  crit: '双爆'
};

export default function GroupTopCard({ data }: Props) {
  const { avatar, game, uid, type } = data;
  const elemColor = ELEMENT_COLORS[avatar.element] ?? '#888';
  const starColor = STAR_COLORS[avatar.rarity] ?? STAR_COLORS[5];
  const artScore = scoreCharacterArtifacts(avatar);
  const typeLabel = TYPE_LABELS[type] ?? type;
  const consLabel = game === 'sr' ? '星魂' : '命座';

  // 双爆值
  let critRate = 0;
  let critDmg = 0;

  if (avatar.stats) {
    for (const stat of avatar.stats) {
      if (stat.key === 'critRate' || stat.name === '暴击率') {
        critRate = parseFloat(stat.value.replace('%', '')) || 0;
      }

      if (stat.key === 'critDmg' || stat.name === '暴击伤害') {
        critDmg = parseFloat(stat.value.replace('%', '')) || 0;
      }
    }
  }

  return (
    <HTML style={{ width: '550px' }}>
      <div
        style={{
          padding: '0',
          background: DARK_BG,
          fontFamily: FONT_FAMILY,
          fontSize: '14px',
          color: '#eee',
          minHeight: '300px'
        }}
      >
        {/* 头部：最强标识 */}
        <div
          style={{
            padding: '20px 24px 14px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            background: 'linear-gradient(135deg, rgba(255,215,0,0.15), rgba(255,215,0,0.02))'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#ffd700',
                textShadow: '0 0 12px rgba(255,215,0,0.4)'
              }}
            >
              👑
            </span>
            <div>
              <div
                style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#fff'
                }}
              >
                群内最强{avatar.name}
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: '#aaa',
                  marginTop: '2px'
                }}
              >
                {typeLabel}排名第 1 · UID: {uid}
              </div>
            </div>
          </div>
        </div>

        {/* 角色信息区 */}
        <div
          style={{
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}
        >
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              border: `3px solid ${starColor}`,
              boxShadow: `0 0 12px ${starColor}44`,
              overflow: 'hidden',
              flexShrink: 0
            }}
          >
            <img src={avatar.icon} style={{ width: '100%', height: '100%' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff' }}>{avatar.name}</span>
              <span
                style={{
                  fontSize: '11px',
                  background: elemColor,
                  color: '#fff',
                  borderRadius: '4px',
                  padding: '2px 8px',
                  fontWeight: 'bold'
                }}
              >
                {avatar.element}
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                gap: '12px',
                marginTop: '4px',
                fontSize: '12px',
                color: '#999'
              }}
            >
              <span>Lv.{avatar.level}</span>
              <span style={{ color: starColor }}>{'★'.repeat(avatar.rarity)}</span>
              <span>
                {consLabel}: {avatar.cons}
              </span>
            </div>
          </div>
        </div>

        {/* 核心数值 */}
        <div
          style={{
            padding: '0 24px 16px',
            display: 'flex',
            gap: '12px'
          }}
        >
          <div
            style={{
              flex: 1,
              background: 'rgba(0,0,0,0.25)',
              borderRadius: '8px',
              padding: '12px 16px',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '11px', color: '#aaa' }}>{game === 'sr' ? '遗器' : '圣遗物'}评分</div>
            <div
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: artScore.grade.color,
                marginTop: '4px'
              }}
            >
              {artScore.totalMark}
            </div>
            <div
              style={{
                fontSize: '12px',
                fontWeight: 'bold',
                color: artScore.grade.color,
                marginTop: '2px'
              }}
            >
              {artScore.grade.grade}
            </div>
          </div>
          <div
            style={{
              flex: 1,
              background: 'rgba(0,0,0,0.25)',
              borderRadius: '8px',
              padding: '12px 16px',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '11px', color: '#aaa' }}>双爆合计</div>
            <div
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#fff',
                marginTop: '4px'
              }}
            >
              {Math.round((critRate + critDmg) * 10) / 10}%
            </div>
            <div style={{ fontSize: '12px', color: '#aaa', marginTop: '2px' }}>
              {critRate}% + {critDmg}%
            </div>
          </div>
          {avatar.weapon && (
            <div
              style={{
                flex: 1,
                background: 'rgba(0,0,0,0.25)',
                borderRadius: '8px',
                padding: '12px 16px',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '11px', color: '#aaa' }}>{game === 'sr' ? '光锥' : '武器'}</div>
              <div
                style={{
                  fontSize: '13px',
                  fontWeight: 'bold',
                  color: '#fff',
                  marginTop: '6px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {avatar.weapon.name}
              </div>
              <div style={{ fontSize: '12px', color: '#aaa', marginTop: '2px' }}>
                Lv.{avatar.weapon.level} 精{avatar.weapon.affix}
              </div>
            </div>
          )}
        </div>

        {/* 天赋 */}
        {avatar.talent && (
          <div
            style={{
              padding: '0 24px 16px',
              display: 'flex',
              gap: '8px',
              justifyContent: 'center'
            }}
          >
            {[
              { label: game === 'sr' ? '普攻' : '普攻', value: avatar.talent.a },
              { label: game === 'sr' ? '战技' : '战技', value: avatar.talent.e },
              { label: game === 'sr' ? '终结技' : '爆发', value: avatar.talent.q }
            ].map(t => (
              <div
                key={t.label}
                style={{
                  background: 'rgba(0,0,0,0.2)',
                  borderRadius: '6px',
                  padding: '6px 14px',
                  textAlign: 'center',
                  minWidth: '60px'
                }}
              >
                <div style={{ fontSize: '10px', color: '#aaa' }}>{t.label}</div>
                <div
                  style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: t.value >= 10 ? '#ffd700' : '#fff',
                    marginTop: '2px'
                  }}
                >
                  {t.value}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 底部 */}
        <div
          style={{
            padding: '10px 24px 16px',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '11px',
            color: '#666'
          }}
        >
          <span>数据来源: {game === 'sr' ? 'Mihomo' : 'Enka Network'}</span>
          <span>{formatDateZh()}</span>
        </div>
      </div>
    </HTML>
  );
}
