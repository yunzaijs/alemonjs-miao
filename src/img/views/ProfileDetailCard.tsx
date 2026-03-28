/**
 * 600px 宽度，深色背景，角色 splash art，属性面板，天赋，命座，武器，圣遗物
 */
import { scoreArtifact, scoreCharacterArtifacts } from '@src/model/miao/artisMark.js';
import type { ArtifactData, ProfileAvatar, StatEntry, TalentData } from '@src/model/miao/enka.js';
import React from 'react';
import HTML from './HTML.js';
import { CONS_COLORS, DARK_BG, ELEMENT_COLORS, FONT_FAMILY, formatDateZh, STAR_COLORS } from './shared.js';

// ─── 属性行 ──────────────────────────────────────────

function AttrRow({ stat, idx }: { stat: StatEntry; idx: number }) {
  const bgColor = idx % 2 === 0 ? 'rgba(0,0,0,0.2)' : 'rgba(50,50,50,0.4)';

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '7px 14px',
        background: bgColor,
        borderRadius: '6px',
        marginBottom: '2px'
      }}
    >
      <span style={{ fontSize: '13px', color: '#ddd' }}>{stat.name}</span>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
        <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff' }}>{stat.value}</span>
        {stat.base && stat.plus && (
          <span style={{ fontSize: '11px', color: '#90e800' }}>
            ({stat.base}+{stat.plus})
          </span>
        )}
      </div>
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
    <div
      style={{
        display: 'flex',
        gap: '10px',
        justifyContent: 'center'
      }}
    >
      {items.map(t => {
        const isCrown = t.level >= 10;

        return (
          <div
            key={t.key}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '8px',
              padding: '8px 16px',
              minWidth: '70px'
            }}
          >
            <span style={{ fontSize: '11px', color: '#aaa' }}>{t.label}</span>
            <span
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: isCrown ? '#ffd700' : '#fff',
                marginTop: '2px'
              }}
            >
              {t.level}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ─── 命座可视化 ──────────────────────────────────────

function ConsRow({ cons }: { cons: number }) {
  return (
    <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
      {[1, 2, 3, 4, 5, 6].map(i => {
        const lit = i <= cons;

        return (
          <div
            key={i}
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: lit ? (CONS_COLORS[cons] ?? '#d4a574') : 'rgba(80,80,80,0.5)',
              border: `2px solid ${lit ? 'rgba(255,255,255,0.4)' : 'rgba(100,100,100,0.3)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
              color: lit ? '#fff' : '#555'
            }}
          >
            {i}
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

// ─── 分区标题 ────────────────────────────────────────

function SectionTitle({ title }: { title: string }) {
  return (
    <div
      style={{
        fontSize: '13px',
        fontWeight: 'bold',
        color: '#e8d5b0',
        marginBottom: '8px',
        paddingBottom: '4px',
        borderBottom: '1px solid rgba(232,213,176,0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}
    >
      <span
        style={{
          width: '3px',
          height: '14px',
          background: '#e8d5b0',
          borderRadius: '2px'
        }}
      />
      {title}
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
  const elemColor = ELEMENT_COLORS[avatar.element] ?? '#888';
  const starColor = STAR_COLORS[avatar.rarity] ?? STAR_COLORS[5];
  const consLabel = game === 'sr' ? '星魂' : '命座';

  return (
    <HTML style={{ width: '600px' }}>
      <div
        style={{
          padding: '0',
          background: DARK_BG,
          fontFamily: FONT_FAMILY,
          fontSize: '14px',
          color: '#eee',
          minHeight: '400px'
        }}
      >
        {/* ── 顶部角色信息区 ── */}
        <div
          style={{
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            borderBottom: '1px solid rgba(255,255,255,0.08)'
          }}
        >
          {/* 圆形头像 */}
          <div
            style={{
              width: '80px',
              height: '80px',
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#fff',
                  textShadow: '0 0 8px rgba(255,255,255,0.2)'
                }}
              >
                {avatar.name}
              </span>
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
                alignItems: 'center',
                gap: '12px',
                marginTop: '6px',
                fontSize: '12px',
                color: '#999'
              }}
            >
              <span>UID: {uid}</span>
              <span style={{ color: starColor }}>{'★'.repeat(avatar.rarity)}</span>
              <span>Lv.{avatar.level}</span>
              <span>
                {consLabel}: {avatar.cons}
              </span>
              {game === 'gs' && <span>好感: {avatar.fetter}</span>}
            </div>
          </div>
        </div>

        {/* ── 天赋 ── */}
        {avatar.talent && (
          <div style={{ padding: '14px 24px' }}>
            <SectionTitle title={game === 'sr' ? '行迹' : '天赋'} />
            <TalentRow talent={avatar.talent} game={game} />
          </div>
        )}

        {/* ── 命座 ── */}
        <div style={{ padding: '4px 24px 14px' }}>
          <SectionTitle title={consLabel} />
          <ConsRow cons={avatar.cons} />
        </div>

        {/* ── 属性面板 ── */}
        {avatar.stats && avatar.stats.length > 0 && (
          <div style={{ padding: '0 24px 14px' }}>
            <SectionTitle title='属性面板' />
            <div>
              {avatar.stats.map((stat, i) => (
                <AttrRow key={stat.key} stat={stat} idx={i} />
              ))}
            </div>
          </div>
        )}

        {/* ── 武器/光锥 ── */}
        {avatar.weapon && (
          <div style={{ padding: '0 24px 14px' }}>
            <SectionTitle title={game === 'sr' ? '光锥' : '武器'} />
            <WeaponSection weapon={avatar.weapon} game={game} />
          </div>
        )}

        {/* ── 圣遗物/遗器 ── */}
        {avatar.artifacts &&
          avatar.artifacts.length > 0 &&
          (() => {
            const totalScore = scoreCharacterArtifacts(avatar);

            return (
              <div style={{ padding: '0 24px 14px' }}>
                <SectionTitle title={game === 'sr' ? '遗器' : '圣遗物'} />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 14px',
                    background: 'rgba(0,0,0,0.25)',
                    borderRadius: '6px',
                    marginBottom: '8px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#aaa' }}>总评分</span>
                    <span
                      style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: totalScore.grade.color
                      }}
                    >
                      {totalScore.totalMark}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#aaa' }}>平均</span>
                    <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff' }}>{totalScore.avgMark}</span>
                    <span
                      style={{
                        fontSize: '13px',
                        fontWeight: 'bold',
                        color: totalScore.grade.color,
                        background: 'rgba(0,0,0,0.3)',
                        borderRadius: '4px',
                        padding: '2px 8px'
                      }}
                    >
                      {totalScore.grade.grade}
                    </span>
                  </div>
                </div>
                {avatar.artifacts.map(art => (
                  <ArtifactItem key={art.pos} art={art} charName={avatar.name} />
                ))}
              </div>
            );
          })()}

        {/* ── 底部 ── */}
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
