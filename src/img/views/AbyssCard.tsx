/**
 * 深渊卡片 — 螺旋深渊 / 混沌回忆 / 忘却之庭 总览
 */
import React from 'react';
import HTML from './HTML.js';
import { FONT_FAMILY, FONT_NZBZ, contStyle } from './shared.js';

// ─── 类型定义 ────────────────────────────────────────

interface AbyssAvatar {
  id: number;
  icon: string;
  rarity: number;
  level: number;
  value: number;
}

interface AbyssBattleAvatar {
  id: number;
  icon: string;
  rarity: number;
  level: number;
}

interface AbyssBattle {
  index: number;
  timestamp: string;
  avatars: AbyssBattleAvatar[];
}

interface AbyssLevel {
  index: number;
  star: number;
  max_star: number;
  battles: AbyssBattle[];
}

interface AbyssFloor {
  index: number;
  icon: string;
  is_unlock: boolean;
  settle_time: string;
  star: number;
  max_star: number;
  levels: AbyssLevel[];
}

export interface AbyssData {
  uid: string;
  game: string;
  schedule_id: number;
  start_time: string;
  end_time: string;
  total_battle_times: number;
  total_win_times: number;
  max_floor: string;
  total_star: number;
  is_unlock: boolean;
  reveal_rank: AbyssAvatar[];
  damage_rank: AbyssAvatar[];
  take_damage_rank: AbyssAvatar[];
  defeat_rank: AbyssAvatar[];
  energy_skill_rank: AbyssAvatar[];
  normal_skill_rank: AbyssAvatar[];
  floors: AbyssFloor[];
  period: string;
}

// ─── 头像名 → 本地角色图 ────────────────────────────

// ─── 子组件 ──────────────────────────────────────────

function StatCard({ title, avatar }: { title: string; avatar: AbyssAvatar | undefined }) {
  if (!avatar) {
    return null;
  }

  return (
    <div style={contStyle({ margin: '5px 10px 5px 5px', width: '175px', height: '300px', position: 'relative', overflow: 'hidden' })}>
      {/* stat-title */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          background: 'rgba(0,0,0,0.5)',
          padding: '5px 10px',
          textShadow: '0 0 1px #000',
          zIndex: 2
        }}
      >
        <span style={{ display: 'block', fontFamily: FONT_NZBZ, fontSize: '24px', fontWeight: 'normal' }}>{title}</span>
        <strong style={{ display: 'block', fontSize: '30px', textShadow: '0 0 3px #000' }}>
          {avatar.value >= 10000 ? `${Math.floor(avatar.value / 10000)}W` : avatar.value}
        </strong>
      </div>
      {/* avatar-banner */}
      <div
        style={{
          width: '175px',
          height: '300px',
          backgroundImage: `url(${avatar.icon})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% auto',
          backgroundPosition: '0 10%'
        }}
      />
    </div>
  );
}

function AvatarIcon({ avatar, size = 48 }: { avatar: AbyssBattleAvatar; size?: number }) {
  const isStar5 = avatar.rarity === 5;
  const bgClass = isStar5 ? 'rgba(239,214,137,0.6)' : 'rgba(137,189,233,0.6)';
  const innerSize = Math.round(size * 0.88);

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        overflow: 'hidden',
        background: bgClass,
        marginRight: '2px',
        boxShadow: '0 0 1px 0 rgba(0,0,0,0.5)'
      }}
    >
      <img
        src={avatar.icon}
        style={{
          width: `${innerSize}px`,
          height: `${innerSize}px`,
          margin: `${Math.round((size - innerSize) / 2)}px`,
          objectFit: 'cover',
          backgroundSize: 'auto 100%',
          backgroundPosition: 'center'
        }}
      />
    </div>
  );
}

function StarDisplay({ count, max }: { count: number; max: number }) {
  const arrs = Array.from({ length: max }, (_, i) => i);

  return (
    <div>
      {arrs.map((_, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            width: '14px',
            height: '14px',
            fontSize: '14px',
            color: i < count ? '#ffd700' : '#555'
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function FloorSection({ floor }: { floor: AbyssFloor }) {
  return (
    <div style={contStyle()}>
      <div style={{ padding: '10px 15px' }}>
        {/* abyss-title */}
        <div style={{ margin: '-3px 0 8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <strong style={{ color: '#d3bc8e', fontSize: '18px', fontFamily: FONT_NZBZ, fontWeight: 'normal', marginRight: '10px' }}>第{floor.index}层</strong>
          <StarDisplay count={floor.star} max={floor.max_star} />
          <span style={{ fontSize: '15px' }}>
            {floor.star}/{floor.max_star}
          </span>
        </div>

        {/* abyss-floor-team: upper + line + lower */}
        {floor.levels.length > 0 && floor.levels[0]?.battles?.length > 0 && (
          <div style={{ display: 'flex', marginBottom: '10px' }}>
            {/* 上半阵容 */}
            <div style={{ display: 'flex', gap: '4px' }}>
              {floor.levels[0].battles[0]?.avatars?.map(av => (
                <AvatarIcon key={av.id} avatar={av} size={48} />
              ))}
            </div>
            <div style={{ width: '1px', background: 'rgba(255,255,255,0.5)', height: '80px', margin: '15px 8px 0' }} />
            {/* 下半阵容 */}
            <div style={{ display: 'flex', gap: '4px' }}>
              {floor.levels[0].battles[1]?.avatars?.map(av => (
                <AvatarIcon key={av.id} avatar={av} size={48} />
              ))}
            </div>
          </div>
        )}

        {/* abyss-detail: 3-column level layout */}
        <div style={{ display: 'flex', width: 'calc(100% + 30px)', margin: '10px -15px -10px' }}>
          {floor.levels.map((level, idx) => (
            <div
              key={level.index}
              style={{
                padding: '5px 10px 7px',
                width: '33%',
                boxShadow: '0 0 1px 0 #fff',
                background: idx % 2 === 1 ? 'rgba(255,255,255,0.1)' : 'transparent'
              }}
            >
              {/* info: title + star + time */}
              <div style={{ display: 'flex', marginBottom: '5px', paddingLeft: '8px', alignItems: 'center' }}>
                <div style={{ fontSize: '16px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>第{level.index}间</div>
                <StarDisplay count={level.star} max={level.max_star} />
              </div>
              {/* avatars: up + line + down */}
              <div style={{ display: 'flex', width: '100%' }}>
                {level.battles.map((battle, bIdx) => (
                  <div key={bIdx} style={{ display: 'flex', position: 'relative', paddingRight: bIdx === 0 ? '15px' : '0' }}>
                    {battle.avatars.map(av => (
                      <AvatarIcon key={av.id} avatar={av} size={33} />
                    ))}
                    {bIdx === 0 && (
                      <div
                        style={{
                          position: 'absolute',
                          width: '1px',
                          height: '16px',
                          background: 'rgba(255,255,255,0.3)',
                          right: '8px',
                          top: '50%',
                          marginTop: '-8px'
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── 主组件 ──────────────────────────────────────────

export default function AbyssCard({ data }: { data: AbyssData }) {
  const gameLabel = data.game === 'sr' ? '混沌回忆' : '深渊';
  const statList = [
    { title: '最强一击', avatar: data.damage_rank?.[0] },
    { title: '最多击破', avatar: data.defeat_rank?.[0] },
    { title: '最高承伤', avatar: data.take_damage_rank?.[0] },
    { title: '元素战技', avatar: data.normal_skill_rank?.[0] },
    { title: '元素爆发', avatar: data.energy_skill_rank?.[0] }
  ];

  // 只显示最近的几层(通常是9-12层或11-12层)
  const displayFloors = (data.floors ?? []).filter(f => f.levels?.length > 0).slice(-4);

  return (
    <HTML style={{ width: '970px' }}>
      <div
        style={{
          width: '970px',
          fontFamily: FONT_FAMILY,
          color: '#fff',
          background: '#2a3860',
          position: 'relative',
          padding: '5px 0 10px 5px'
        }}
      >
        {/* 标题栏 — head-box flex 70/30 */}
        <div
          style={{
            display: 'flex',
            width: '100%',
            padding: '10px 10px 0'
          }}
        >
          <div style={{ width: '70%' }}>
            <div style={{ fontFamily: FONT_NZBZ, fontSize: '45px', paddingBottom: '10px' }}>
              #{gameLabel}
              <span style={{ fontSize: '30px', marginLeft: '10px', color: '#d3bc8e' }}>
                {data.period ?? ''} · {data.total_battle_times}次战斗
              </span>
            </div>
          </div>
          <div style={{ width: '30%', textAlign: 'right', paddingTop: '25px', paddingRight: '10px', fontSize: '25px' }}>UID:{data.uid}</div>
        </div>

        {/* 统计卡片 — abyss-stat */}
        {statList.some(s => s.avatar) && (
          <div style={{ display: 'flex', padding: '5px' }}>{statList.map((s, i) => s.avatar && <StatCard key={i} title={s.title} avatar={s.avatar} />)}</div>
        )}

        {/* 各层详情 */}
        {displayFloors.map(floor => (
          <FloorSection key={floor.index} floor={floor} />
        ))}

        {/* 底栏 */}
        <div style={contStyle()}>
          <div style={{ padding: '10px 15px', fontSize: '16px' }}>
            <div>角色装备与圣遗物为当前最新状态</div>
          </div>
        </div>

        <div style={{ position: 'relative', textAlign: 'center', padding: '12px 20px', fontSize: '16px', color: '#fff', textShadow: '1px 1px 1px #000' }}>
          Miao By ALemonJS
        </div>
      </div>
    </HTML>
  );
}
