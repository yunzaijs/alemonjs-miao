/**
 * 练度统计卡片 — 显示角色等级、命座、武器等级分布
 */
import type { ProfileAvatar } from '@src/model/miao/enka.js';
import React from 'react';
import HTML from './HTML.js';

// ─── 颜色常量 ────────────────────────────────────────

const STAR_BORDER: Record<number, string> = {
  5: '#ce8d54',
  4: '#a0a0e8',
  3: '#6ba8e8'
};

const ELEMENT_COLORS: Record<string, string> = {
  火: '#ef5350',
  水: '#42a5f5',
  风: '#66bb6a',
  雷: '#ab47bc',
  草: '#8bc34a',
  冰: '#29b6f6',
  岩: '#ffa726',
  物理: '#9e9e9e',
  量子: '#7e57c2',
  虚数: '#fdd835'
};

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
            background: color,
            borderRadius: '3px',
            minWidth: value > 0 ? '2px' : '0'
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

function CharRow({ avatar, game }: { avatar: ProfileAvatar; game: string }) {
  const border = STAR_BORDER[avatar.rarity] ?? STAR_BORDER[4];
  const elemColor = ELEMENT_COLORS[avatar.element] ?? '#888';
  const consLabel = game === 'sr' ? '星魂' : '命座';
  const weaponLabel = game === 'sr' ? '光锥' : '武器';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '6px 14px',
        background: 'rgba(0,0,0,0.15)',
        borderRadius: '6px',
        marginBottom: '4px'
      }}
    >
      <div
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: `2px solid ${border}`,
          overflow: 'hidden',
          flexShrink: 0
        }}
      >
        <img src={avatar.icon} style={{ width: '100%', height: '100%' }} />
      </div>
      <div style={{ width: '60px', flexShrink: 0 }}>
        <div
          style={{
            fontSize: '12px',
            fontWeight: 'bold',
            color: '#fff',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {avatar.abbr || avatar.name}
        </div>
      </div>
      <span
        style={{
          fontSize: '10px',
          background: elemColor,
          color: '#fff',
          borderRadius: '3px',
          padding: '1px 5px',
          flexShrink: 0
        }}
      >
        {avatar.element}
      </span>
      <span style={{ fontSize: '12px', color: '#e8d5b0', width: '45px' }}>Lv.{avatar.level}</span>
      <span style={{ fontSize: '11px', color: '#ccc', width: '45px' }}>
        {consLabel}
        {avatar.cons}
      </span>
      {avatar.weapon && (
        <span style={{ fontSize: '11px', color: '#aaa' }}>
          {weaponLabel} Lv.{avatar.weapon.level} 精{avatar.weapon.affix}
        </span>
      )}
      {avatar.talent && (
        <span style={{ fontSize: '11px', color: '#aaa', marginLeft: 'auto' }}>
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
    <HTML style={{ width: '680px' }}>
      <div
        style={{
          padding: '0',
          background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          fontFamily: '"tttgbnumber", "PingFang SC", system-ui, sans-serif',
          fontSize: '14px',
          color: '#eee',
          minHeight: '400px'
        }}
      >
        {/* 头部 */}
        <div
          style={{
            padding: '20px 24px 14px',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <div
            style={{
              fontSize: '22px',
              fontWeight: 'bold',
              color: '#fff',
              textShadow: '0 0 6px rgba(255,255,255,0.3)'
            }}
          >
            #练度统计
            <span
              style={{
                fontSize: '13px',
                color: '#aaa',
                fontWeight: 'normal',
                marginLeft: '12px'
              }}
            >
              {nickname} · UID:{uid}
            </span>
          </div>
        </div>

        {/* 概览 */}
        <div
          style={{
            padding: '14px 24px',
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap'
          }}
        >
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
                background: 'rgba(0,0,0,0.25)',
                borderRadius: '8px',
                padding: '10px 16px',
                minWidth: '70px'
              }}
            >
              <span style={{ fontSize: '11px', color: '#aaa' }}>{item.label}</span>
              <span
                style={{
                  fontSize: '22px',
                  fontWeight: 'bold',
                  color: item.color,
                  marginTop: '2px'
                }}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* 等级分布 & 命座分布 */}
        <div style={{ padding: '0 24px 14px', display: 'flex', gap: '20px' }}>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: '13px',
                fontWeight: 'bold',
                color: '#e8d5b0',
                marginBottom: '8px',
                paddingBottom: '4px',
                borderBottom: '1px solid rgba(232,213,176,0.2)'
              }}
            >
              等级分布
            </div>
            {levelBuckets.map(b => (
              <StatBar key={b.label} label={`Lv.${b.label}`} value={b.count} max={maxBucketVal} color='#42a5f5' />
            ))}
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: '13px',
                fontWeight: 'bold',
                color: '#e8d5b0',
                marginBottom: '8px',
                paddingBottom: '4px',
                borderBottom: '1px solid rgba(232,213,176,0.2)'
              }}
            >
              {consLabel}分布
            </div>
            {consBuckets.map(b => (
              <StatBar key={b.label} label={b.label} value={b.count} max={maxConsVal} color='#ab47bc' />
            ))}
          </div>
        </div>

        {/* 元素分布 */}
        <div style={{ padding: '0 24px 14px' }}>
          <div
            style={{
              fontSize: '13px',
              fontWeight: 'bold',
              color: '#e8d5b0',
              marginBottom: '8px',
              paddingBottom: '4px',
              borderBottom: '1px solid rgba(232,213,176,0.2)'
            }}
          >
            元素分布
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {Object.entries(elemCounts).map(([elem, count]) => (
              <div
                key={elem}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'rgba(0,0,0,0.25)',
                  borderRadius: '6px',
                  padding: '6px 12px'
                }}
              >
                <span
                  style={{
                    fontSize: '12px',
                    color: ELEMENT_COLORS[elem] ?? '#888',
                    fontWeight: 'bold'
                  }}
                >
                  {elem}
                </span>
                <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff' }}>{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 角色列表 */}
        <div style={{ padding: '0 24px 14px' }}>
          <div
            style={{
              fontSize: '13px',
              fontWeight: 'bold',
              color: '#e8d5b0',
              marginBottom: '8px',
              paddingBottom: '4px',
              borderBottom: '1px solid rgba(232,213,176,0.2)'
            }}
          >
            角色详情
          </div>
          {sorted.map(av => (
            <CharRow key={av.id} avatar={av} game={game} />
          ))}
        </div>

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
          <span>{new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}</span>
        </div>
      </div>
    </HTML>
  );
}
