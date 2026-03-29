/**
 * 600px 宽度，深色背景，角色 splash art，属性面板，天赋，命座，武器，圣遗物
 */
import { scoreArtifact, scoreCharacterArtifacts } from '@src/model/miao/artisMark.js';
import type { ArtifactData, ProfileAvatar, StatEntry, TalentData } from '@src/model/miao/enka.js';
import React from 'react';
import HTML from './HTML.js';
import { CONS_COLORS, contStyle, contTitleStyle, ELEM_BG, FONT_FAMILY, FONT_NZBZ, STAR_COLORS, statIconStyle, URL_CROWN } from './shared.js';

// ─── 属性行 ──────────────────────────────────────────

function AttrRow({ stat, idx }: { stat: StatEntry; idx: number }) {
  const bgColor = idx % 2 === 0 ? 'rgba(0,0,0,0.4)' : 'rgba(50,50,50,0.4)';

  return (
    <div
      style={{
        width: '300px',
        fontSize: '17px',
        listStyle: 'none',
        height: '32px',
        lineHeight: '32px',
        textShadow: '0 0 1px rgba(0,0,0,0.5)',
        display: 'flex',
        paddingLeft: '3px',
        background: bgColor,
        color: '#fff'
      }}
    >
      <div style={{ width: '26px', padding: '8px 5px 0' }}>
        <i style={statIconStyle(stat.key)} />
      </div>
      <div style={{ width: '75px', textShadow: '0 0 1px rgba(0,0,0,0.8), 1px 1px 3px rgba(0,0,0,0.5)' }}>{stat.name}</div>
      <div
        style={{
          width: '100px',
          textAlign: 'right',
          fontWeight: 'normal',
          paddingRight: '10px',
          textShadow: '0 0 1px rgba(0,0,0,0.8), 1px 1px 3px rgba(0,0,0,0.5)'
        }}
      >
        {stat.value}
      </div>
      {stat.base && stat.plus && (
        <div style={{ fontWeight: 'normal', width: '70px', textAlign: 'right', fontSize: '12px', padding: '4px 10px 0 0', background: 'rgba(0,0,0,0.2)' }}>
          <span style={{ display: 'block', height: '13px', lineHeight: '13px', color: '#eee', fontSize: '11px' }}>{stat.base}</span>
          <span style={{ display: 'block', height: '13px', lineHeight: '13px', color: '#90e800', fontSize: '11px' }}>+{stat.plus}</span>
        </div>
      )}
    </div>
  );
}

// ─── 天赋显示 ────────────────────────────────────────

function TalentRow({ talent, game }: { talent: TalentData; game: string }) {
  const labels = game === 'sr' ? ['普攻', '战技', '终结技'] : ['普攻', '战技', '爆发'];
  const items = [
    { label: labels[0], level: talent.a, key: 'a' },
    { label: labels[1], level: talent.e, key: 'e' },
    { label: labels[2], level: talent.q, key: 'q' }
  ];

  return (
    <div style={{ display: 'flex', width: '300px', margin: '0 0 10px 0' }}>
      {items.map(t => {
        const isCrown = t.level >= 10;

        return (
          <div key={t.key} style={{ flex: 1, textAlign: 'center' }}>
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0,0,0,0.35)',
                position: 'relative'
              }}
            >
              {isCrown && (
                <img
                  src={URL_CROWN}
                  style={{
                    position: 'absolute',
                    width: '28px',
                    height: '28px',
                    top: '-2px',
                    left: '50%',
                    marginLeft: '-14px'
                  }}
                />
              )}
              <span style={{ fontSize: '11px', color: '#ccc' }}>{t.label}</span>
              <strong
                style={{
                  background: isCrown ? '#2e353e' : '#fff',
                  color: isCrown ? '#ffdfa0' : '#000',
                  width: '34px',
                  height: '26px',
                  lineHeight: '26px',
                  fontSize: '17px',
                  textAlign: 'center',
                  borderRadius: '5px',
                  boxShadow: isCrown ? '0 0 1px 0 #d3bc8e, 1px 1px 2px 0 rgba(0,0,0,0.5)' : '0 0 5px 0 #000',
                  display: 'block',
                  marginTop: '4px'
                }}
              >
                {t.level}
              </strong>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── 命座可视化 ──────────────────────────────────────

function ConsRow({ cons }: { cons: number }) {
  return (
    <div style={{ display: 'flex', width: '250px' }}>
      {[1, 2, 3, 4, 5, 6].map(i => {
        const lit = i <= cons;

        return (
          <div key={i} style={{ flex: 1 }}>
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                margin: '0 -5px',
                background: lit ? (CONS_COLORS[cons] ?? '#d4a574') : 'rgba(80,80,80,0.5)',
                filter: lit ? 'none' : 'grayscale(100%)',
                opacity: lit ? 1 : 0.4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#fff'
              }}
            >
              {i}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── 武器/光锥 ──────────────────────────────────────

function WeaponSection({ weapon }: { weapon: NonNullable<ProfileAvatar['weapon']>; game: string }) {
  const starColor = STAR_COLORS[weapon.rarity] ?? STAR_COLORS[4];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '10px',
          border: `2px solid ${starColor}`,
          overflow: 'hidden',
          flexShrink: 0,
          background: 'rgba(0,0,0,0.3)'
        }}
      >
        <img src={weapon.icon} style={{ width: '100%', height: '100%' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff' }}>{weapon.name}</span>
        <div style={{ display: 'flex', gap: '8px', marginTop: '4px', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: '#ccc' }}>Lv.{weapon.level}</span>
          <span
            style={{
              fontSize: '11px',
              background: '#f0a030',
              color: '#fff',
              borderRadius: '3px',
              padding: '0 5px'
            }}
          >
            精{weapon.affix}
          </span>
          <span style={{ fontSize: '12px', color: starColor }}>{'★'.repeat(weapon.rarity)}</span>
        </div>
      </div>
    </div>
  );
}

// ─── 圣遗物/遗器 ────────────────────────────────────

function ArtifactItem({ art, charName }: { art: ArtifactData; charName: string }) {
  const starColor = STAR_COLORS[art.rarity] ?? STAR_COLORS[5];
  const score = scoreArtifact(art, charName);

  return (
    <div
      style={{
        display: 'flex',
        gap: '10px',
        padding: '8px 0',
        borderBottom: '1px solid rgba(255,255,255,0.06)'
      }}
    >
      <div
        style={{
          width: '44px',
          height: '44px',
          borderRadius: '8px',
          border: `1.5px solid ${starColor}`,
          overflow: 'hidden',
          flexShrink: 0,
          background: 'rgba(0,0,0,0.25)'
        }}
      >
        <img src={art.icon} style={{ width: '100%', height: '100%' }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span
            style={{
              fontSize: '12px',
              color: '#ddd',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '120px'
            }}
          >
            {art.name}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 'bold',
                color: score.grade.color,
                background: 'rgba(0,0,0,0.3)',
                borderRadius: '3px',
                padding: '0 4px'
              }}
            >
              {score.mark} {score.grade.grade}
            </span>
            <span style={{ fontSize: '11px', color: '#888' }}>+{art.level}</span>
          </div>
        </div>
        <div style={{ fontSize: '12px', color: '#e8d5b0', marginTop: '2px' }}>
          {art.mainName} {art.mainValue}
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '4px 10px',
            marginTop: '3px'
          }}
        >
          {art.subStats.map((sub, i) => (
            <span key={i} style={{ fontSize: '10px', color: '#aaa' }}>
              {sub.name}+{sub.value}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── 主组件 ──────────────────────────────────────────

export interface ProfileDetailData {
  game: string;
  uid: string;
  avatar: ProfileAvatar;
}

interface Props {
  data: ProfileDetailData;
}

export default function ProfileDetailCard({ data }: Props) {
  const { avatar, game, uid } = data;
  const elemBg = ELEM_BG[avatar.element] ?? ELEM_BG.hydro;

  return (
    <HTML style={{ width: '600px' }}>
      <div
        style={{
          width: '600px',
          fontFamily: FONT_FAMILY,
          fontSize: '18px',
          color: '#1e1f20',
          backgroundImage: `url(${elemBg})`,
          backgroundSize: 'cover'
        }}
      >
        <div
          style={{
            width: '600px',
            padding: '0',
            backgroundSize: 'cover',
            overflow: 'hidden'
          }}
        >
          {/* ── 顶部区域：角色名 + 等级 + 属性面板 ── */}
          <div style={{ padding: '0 10px', marginRight: '5px', position: 'relative', margin: '0 -15px 10px -10px' }}>
            {/* 角色名 (NZBZ) */}
            <div style={{ position: 'relative', padding: '20px 20px 10px', color: '#fff', textAlign: 'right' }}>
              <div
                style={{
                  fontFamily: FONT_NZBZ,
                  fontSize: '50px',
                  textShadow: '0 0 3px #000, 2px 2px 4px rgba(0,0,0,0.7)'
                }}
              >
                {avatar.name}
              </div>
              <div
                style={{
                  marginBottom: '20px',
                  textShadow: '0 0 3px #000, 2px 2px 4px rgba(0,0,0,0.7)',
                  textAlign: 'right'
                }}
              >
                UID {uid} - Lv.{avatar.level}
                <span
                  style={{
                    display: 'inline-block',
                    verticalAlign: 'bottom',
                    padding: '0 5px',
                    borderRadius: '4px',
                    marginLeft: '5px',
                    background: CONS_COLORS[avatar.cons] ?? '#666',
                    color: '#fff'
                  }}
                >
                  {avatar.cons}
                  {game === 'sr' ? '魂' : '命'}
                </span>
              </div>

              {/* 天赋 (原神) */}
              {game === 'gs' && avatar.talent && <TalentRow talent={avatar.talent} game={game} />}

              {/* 属性面板 */}
              {avatar.stats && avatar.stats.length > 0 && (
                <div
                  style={{
                    backdropFilter: 'blur(2px)',
                    background: 'rgba(0,0,0,0.2)',
                    borderRadius: '8px',
                    overflow: 'hidden'
                  }}
                >
                  {avatar.stats.map((stat, i) => (
                    <AttrRow key={stat.key} stat={stat} idx={i} />
                  ))}
                </div>
              )}
            </div>

            {/* 命座 */}
            <div style={{ position: 'relative', padding: '5px 20px' }}>
              <ConsRow cons={avatar.cons} />
            </div>
          </div>

          {/* ── 星铁天赋 ── */}
          {game === 'sr' && avatar.talent && (
            <div style={contStyle({ margin: '5px 15px' })}>
              <div style={contTitleStyle()}>行迹</div>
              <div style={{ padding: '10px 15px' }}>
                <TalentRow talent={avatar.talent} game={game} />
              </div>
            </div>
          )}

          {/* ── 武器/光锥 ── */}
          {avatar.weapon && (
            <div style={contStyle({ margin: '5px 15px' })}>
              <div style={contTitleStyle()}>{game === 'sr' ? '光锥' : '武器'}</div>
              <div style={{ padding: '10px 15px' }}>
                <WeaponSection weapon={avatar.weapon} game={game} />
              </div>
            </div>
          )}

          {/* ── 圣遗物/遗器 ── */}
          {avatar.artifacts &&
            avatar.artifacts.length > 0 &&
            (() => {
              const totalScore = scoreCharacterArtifacts(avatar);

              return (
                <div style={contStyle({ margin: '5px 15px' })}>
                  <div style={contTitleStyle()}>
                    {game === 'sr' ? '遗器' : '圣遗物'}
                    <span style={{ fontSize: '12px', color: '#aaa', marginLeft: '10px', fontWeight: 'normal' }}>
                      评分 {totalScore.totalMark} · {totalScore.grade.grade}
                    </span>
                  </div>
                  <div style={{ padding: '5px 10px' }}>
                    {avatar.artifacts.map(art => (
                      <ArtifactItem key={art.pos} art={art} charName={avatar.name} />
                    ))}
                  </div>
                </div>
              );
            })()}

          {/* ── copyright ── */}
          <div
            style={{
              fontSize: '14px',
              textAlign: 'center',
              color: '#fff',
              textShadow: '1px 1px 1px #000',
              margin: '10px 0'
            }}
          >
            AlemonJS
          </div>
        </div>
      </div>
    </HTML>
  );
}
