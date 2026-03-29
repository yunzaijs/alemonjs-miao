/**
 * 群内最强卡片 — 显示某角色的群内第一名详情
 */
import { scoreCharacterArtifacts } from '@src/model/miao/artisMark.js';
import type { ProfileAvatar } from '@src/model/miao/enka.js';
import React from 'react';
import HTML from './HTML.js';
import { ELEMENT_COLORS, FONT_FAMILY, FONT_NZBZ, STAR_COLORS, URL_BG01, URL_CROWN, URL_MAIN01, contStyle, contTitleStyle, formatDateZh } from './shared.js';

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
          width: '550px',
          fontFamily: FONT_FAMILY,
          fontSize: '16px',
          color: '#1e1f20',
          backgroundImage: `url(${URL_BG01})`,
          backgroundSize: '100% auto',
          backgroundPosition: 'left center'
        }}
      >
        <div
          style={{
            width: '550px',
            padding: '20px 15px 10px 15px',
            backgroundImage: `url(${URL_MAIN01})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center -25px'
          }}
        >
          {/* head-box */}
          <div style={{ borderRadius: '15px', padding: '10px 20px', color: '#fff', marginTop: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src={URL_CROWN} style={{ width: '28px', height: '28px' }} />
            <div>
              <div
                style={{
                  fontFamily: FONT_NZBZ,
                  fontSize: '30px',
                  textShadow: '0 0 1px #000, 1px 1px 3px rgba(0,0,0,0.9)'
                }}
              >
                群内最强{avatar.name}
              </div>
              <div style={{ fontSize: '14px', textShadow: '0 0 1px #000, 1px 1px 3px rgba(0,0,0,0.9)' }}>
                {typeLabel}排名第 1 · UID: {uid}
              </div>
            </div>
          </div>

          {/* 角色信息 */}
          <div style={contStyle()}>
            <div style={contTitleStyle({ display: 'flex', alignItems: 'center', gap: '10px' })}>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  border: `2px solid ${starColor}`,
                  boxShadow: '1px 1px 3px 0 #000',
                  overflow: 'hidden',
                  flexShrink: 0
                }}
              >
                <img src={avatar.icon} style={{ width: '100%', height: '100%' }} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{avatar.name}</span>
                  <span style={{ fontSize: '12px', background: elemColor, color: '#fff', borderRadius: '3px', padding: '1px 6px' }}>{avatar.element}</span>
                </div>
                <div style={{ fontSize: '13px', color: '#fff', fontWeight: 'normal', marginTop: '2px' }}>
                  Lv.{avatar.level} · {'★'.repeat(avatar.rarity)} · {consLabel}: {avatar.cons}
                </div>
              </div>
            </div>

            {/* 核心数值 */}
            <div style={{ display: 'flex', gap: '10px', padding: '12px 15px' }}>
              <div style={{ flex: 1, background: 'rgba(0,0,0,0.3)', borderRadius: '6px', padding: '10px', textAlign: 'center', color: '#fff' }}>
                <div style={{ fontSize: '12px', color: '#d3bc8e' }}>{game === 'sr' ? '遗器' : '圣遗物'}评分</div>
                <div style={{ fontSize: '22px', fontWeight: 'bold', color: artScore.grade.color, marginTop: '4px' }}>{artScore.totalMark}</div>
                <div style={{ fontSize: '12px', fontWeight: 'bold', color: artScore.grade.color }}>{artScore.grade.grade}</div>
              </div>
              <div style={{ flex: 1, background: 'rgba(0,0,0,0.3)', borderRadius: '6px', padding: '10px', textAlign: 'center', color: '#fff' }}>
                <div style={{ fontSize: '12px', color: '#d3bc8e' }}>双爆合计</div>
                <div style={{ fontSize: '22px', fontWeight: 'bold', marginTop: '4px' }}>{Math.round((critRate + critDmg) * 10) / 10}%</div>
                <div style={{ fontSize: '12px', color: '#aaa' }}>
                  {critRate}% + {critDmg}%
                </div>
              </div>
              {avatar.weapon && (
                <div style={{ flex: 1, background: 'rgba(0,0,0,0.3)', borderRadius: '6px', padding: '10px', textAlign: 'center', color: '#fff' }}>
                  <div style={{ fontSize: '12px', color: '#d3bc8e' }}>{game === 'sr' ? '光锥' : '武器'}</div>
                  <div style={{ fontSize: '13px', fontWeight: 'bold', marginTop: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {avatar.weapon.name}
                  </div>
                  <div style={{ fontSize: '12px', color: '#aaa' }}>
                    Lv.{avatar.weapon.level} 精{avatar.weapon.affix}
                  </div>
                </div>
              )}
            </div>

            {/* 天赋 */}
            {avatar.talent && (
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', padding: '0 15px 12px' }}>
                {[
                  { label: game === 'sr' ? '普攻' : '普攻', value: avatar.talent.a },
                  { label: game === 'sr' ? '战技' : '战技', value: avatar.talent.e },
                  { label: game === 'sr' ? '终结技' : '爆发', value: avatar.talent.q }
                ].map(t => (
                  <div
                    key={t.label}
                    style={{
                      background: 'rgba(0,0,0,0.3)',
                      borderRadius: '6px',
                      padding: '6px 14px',
                      textAlign: 'center',
                      minWidth: '60px',
                      color: '#fff'
                    }}
                  >
                    <div style={{ fontSize: '11px', color: '#d3bc8e' }}>{t.label}</div>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: t.value >= 10 ? '#ffd700' : '#fff', marginTop: '2px' }}>{t.value}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div
            style={{
              display: 'flex',
              background: 'rgba(0,0,0,0.4)',
              width: '100%',
              padding: '10px 15px',
              fontSize: '12px',
              color: '#fff',
              borderRadius: '0 0 10px 10px',
              margin: '5px 10px'
            }}
          >
            <span style={{ width: '50%' }}>数据来源: {game === 'sr' ? 'Mihomo' : 'Enka Network'}</span>
            <span style={{ width: '50%', textAlign: 'right' }}>{formatDateZh()}</span>
          </div>

          <div style={{ fontSize: '14px', textAlign: 'center', color: '#fff', textShadow: '1px 1px 1px #000', margin: '10px 0' }}> AlemonJS</div>
        </div>
      </div>
    </HTML>
  );
}
