/**
 * 练度统计卡片 — 显示角色等级、命座、武器等级分布
 */
import type { ProfileAvatar } from '@src/model/miao/enka.js';
import React from 'react';
import HTML from './HTML.js';
import { ELEMENT_COLORS, FONT_FAMILY, FONT_NZBZ, STAR_COLORS, contStyle, contTitleStyle, fetterStyle, formatDateZh } from './shared.js';

// ─── 统计条 ─────────────────────────────────────────

function StatBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
      <span style={{ fontSize: '12px', color: '#aaa', width: '50px', textAlign: 'right' }}>{label}</span>
      <div
        style={{
          flex: 1,
          height: '16px',
          background: 'rgba(0,0,0,0.3)',
          borderRadius: '3px',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: '100%',
            background: `linear-gradient(90deg, ${color}cc, ${color})`,
            borderRadius: '3px',
            minWidth: value > 0 ? '2px' : '0',
            boxShadow: `0 0 6px ${color}44`
          }}
        />
        <span
          style={{
            position: 'absolute',
            right: '4px',
            top: '0',
            lineHeight: '16px',
            fontSize: '10px',
            color: '#fff',
            fontWeight: 'bold'
          }}
        >
          {value}
        </span>
      </div>
    </div>
  );
}

// ─── 角色列表行 ──────────────────────────────────────

function CharRow({ avatar, game, idx }: { avatar: ProfileAvatar; game: string; idx: number }) {
  const border = STAR_COLORS[avatar.rarity] ?? STAR_COLORS[4];
  const consLabel = game === 'sr' ? '星魂' : '命座';
  const bgColor = idx % 2 === 0 ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.2)';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 10px',
        background: bgColor,
        fontSize: '13px',
        color: '#fff'
      }}
    >
      {/* 序号 */}
      <span style={{ width: '22px', textAlign: 'center', color: border, fontWeight: 'bold', fontSize: '12px' }}>{idx + 1}</span>
      {/* 头像 */}
      <div
        style={{
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          border: `2px solid ${border}`,
          overflow: 'hidden',
          flexShrink: 0
        }}
      >
        <img src={avatar.icon} style={{ width: '100%', height: '100%' }} />
      </div>
      {/* 名称 */}
      <span style={{ width: '65px', flexShrink: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{avatar.abbr || avatar.name}</span>
      {/* 等级 */}
      <span style={{ width: '42px', color: '#e8d5b0' }}>Lv.{avatar.level}</span>
      {/* 命座 */}
      <span style={{ width: '35px', fontSize: '12px' }}>
        {consLabel}
        {avatar.cons}
      </span>
      {/* 好感 */}
      {avatar.fetter !== undefined && <div style={fetterStyle(avatar.fetter, 20)} />}
      {/* 武器 */}
      {avatar.weapon && (
        <span style={{ fontSize: '12px', color: '#ccc', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {avatar.weapon.name} Lv.{avatar.weapon.level} 精{avatar.weapon.affix}
        </span>
      )}
      {/* 天赋 */}
      {avatar.talent && (
        <span style={{ fontSize: '12px', color: '#aaa', flexShrink: 0 }}>
          {avatar.talent.a}/{avatar.talent.e}/{avatar.talent.q}
        </span>
      )}
    </div>
  );
}

// ─── 主组件 ──────────────────────────────────────────

export interface TrainingStatData {
  game: string;
  uid: string;
  nickname: string;
  avatars: ProfileAvatar[];
}

interface Props {
  data: TrainingStatData;
}

export default function TrainingStatCard({ data }: Props) {
  const { avatars, game, uid, nickname } = data;

  // 统计数据
  const total = avatars.length;
  const star5 = avatars.filter(a => a.rarity === 5).length;
  const star4 = avatars.filter(a => a.rarity === 4).length;
  const maxLevel = avatars.filter(a => a.level >= 90).length;
  const maxCons = avatars.filter(a => a.cons >= 6).length;

  // 等级分布
  const levelBuckets = [
    { label: '90', count: avatars.filter(a => a.level >= 90).length },
    { label: '80-89', count: avatars.filter(a => a.level >= 80 && a.level < 90).length },
    { label: '70-79', count: avatars.filter(a => a.level >= 70 && a.level < 80).length },
    { label: '60-69', count: avatars.filter(a => a.level >= 60 && a.level < 70).length },
    { label: '<60', count: avatars.filter(a => a.level < 60).length }
  ];

  // 命座分布
  const consBuckets = [0, 1, 2, 3, 4, 5, 6].map(c => ({
    label: `${game === 'sr' ? '星魂' : '命座'}${c}`,
    count: avatars.filter(a => a.cons === c).length
  }));

  // 元素分布
  const elemCounts: Record<string, number> = {};

  for (const av of avatars) {
    elemCounts[av.element] = (elemCounts[av.element] ?? 0) + 1;
  }

  const maxBucketVal = Math.max(...levelBuckets.map(b => b.count), 1);
  const maxConsVal = Math.max(...consBuckets.map(b => b.count), 1);
  const consLabel = game === 'sr' ? '星魂' : '命座';

  // 按等级降序 + 命座降序排列
  const sorted = [...avatars].sort((a, b) => {
    if (b.level !== a.level) {
      return b.level - a.level;
    }

    return b.cons - a.cons;
  });

  return (
    <HTML style={{ width: '600px' }}>
      <div
        style={{
          width: '600px',
          fontFamily: FONT_FAMILY,
          fontSize: '16px',
          color: '#fff',
          background: '#2a3860'
        }}
      >
        <div
          style={{
            width: '600px',
            padding: '5px 0 10px 5px'
          }}
        >
          {/* head-box — stat style */}
          <div style={{ display: 'flex', width: '100%', padding: '10px 0' }}>
            <div style={{ width: '70%' }}>
              <div style={{ fontFamily: FONT_NZBZ, fontSize: '36px', paddingBottom: '10px' }}>#练度统计</div>
              <div style={{ fontSize: '16px' }}>
                {nickname} · UID:{uid}
              </div>
            </div>
          </div>

          {/* 概览 */}
          <div style={contStyle()}>
            <div style={contTitleStyle()}>概览</div>
            <div style={{ display: 'flex', padding: '12px 15px', gap: '10px', flexWrap: 'wrap' }}>
              {[
                { label: '总角色', value: total, color: '#42a5f5' },
                { label: '五星', value: star5, color: '#ce8d54' },
                { label: '四星', value: star4, color: '#a0a0e8' },
                { label: '满级', value: maxLevel, color: '#66bb6a' },
                { label: `满${consLabel}`, value: maxCons, color: '#d4a574' }
              ].map(item => (
                <div
                  key={item.label}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius: '6px',
                    padding: '8px 14px',
                    minWidth: '65px'
                  }}
                >
                  <span style={{ fontSize: '12px', color: '#d3bc8e' }}>{item.label}</span>
                  <span style={{ fontSize: '22px', fontWeight: 'bold', color: item.color, marginTop: '2px' }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 等级分布 & 命座分布 */}
          <div style={{ display: 'flex', gap: '10px', padding: '0 0 5px' }}>
            <div style={contStyle({ flex: 1 })}>
              <div style={contTitleStyle()}>等级分布</div>
              <div style={{ padding: '8px 12px' }}>
                {levelBuckets.map(b => (
                  <StatBar key={b.label} label={`Lv.${b.label}`} value={b.count} max={maxBucketVal} color='#42a5f5' />
                ))}
              </div>
            </div>
            <div style={contStyle({ flex: 1 })}>
              <div style={contTitleStyle()}>{consLabel}分布</div>
              <div style={{ padding: '8px 12px' }}>
                {consBuckets.map(b => (
                  <StatBar key={b.label} label={b.label} value={b.count} max={maxConsVal} color='#ab47bc' />
                ))}
              </div>
            </div>
          </div>

          {/* 元素分布 */}
          <div style={contStyle()}>
            <div style={contTitleStyle()}>元素分布</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', padding: '10px 15px' }}>
              {Object.entries(elemCounts).map(([elem, count]) => (
                <div
                  key={elem}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius: '4px',
                    padding: '5px 10px'
                  }}
                >
                  <span style={{ fontSize: '13px', color: ELEMENT_COLORS[elem] ?? '#888', fontWeight: 'bold' }}>{elem}</span>
                  <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff' }}>{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 角色列表 */}
          <div style={contStyle()}>
            <div style={contTitleStyle()}>角色详情</div>
            {sorted.map((av, idx) => (
              <CharRow key={av.id} avatar={av} game={game} idx={idx} />
            ))}
          </div>

          {/* 底部 */}
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
