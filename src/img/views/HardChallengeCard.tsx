/**
 * 幽境危战卡片 — 显示挑战关卡、阵容、最佳伤害
 */
import React from 'react';
import HTML from './HTML.js';

// ─── 类型定义 ────────────────────────────────────────

export interface HardChallengeAvatar {
  avatar_id: number;
  name: string;
  level: number;
  rarity: number;
  rank: number;
}

export interface HardChallengeBestAvatar {
  avatar_id: number;
  dps: number;
}

export interface HardChallengeMonster {
  level: number;
  icon: string;
  desc: string[];
}

export interface HardChallengeEntry {
  name: string;
  monster: HardChallengeMonster;
  second: number;
  avatars: HardChallengeAvatar[];
  best_avatars: HardChallengeBestAvatar[];
}

export interface HardChallengeBest {
  difficulty: number;
  second: number;
  has_data: boolean;
}

export interface HardChallengeSchedule {
  start_time: string;
  end_time: string;
}

export interface HardChallengeData {
  uid: string;
  has_data: boolean;
  best: HardChallengeBest;
  challs: HardChallengeEntry[];
  schedule: HardChallengeSchedule;
}

// ─── 常量 ────────────────────────────────────────────

const DIFFICULTY_NAMES: Record<number, string> = {
  1: '普通',
  2: '进阶',
  3: '困难',
  4: '险恶',
  5: '无畏',
  6: '绝境'
};

const DIFFICULTY_ROMAN: Record<number, string> = {
  1: 'I',
  2: 'II',
  3: 'III',
  4: 'IV',
  5: 'V',
  6: 'VI'
};

const RARITY_COLORS: Record<number, string> = {
  5: '#c6923a',
  4: '#a256e1',
  3: '#5180cb'
};

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;

  if (m > 0) {
    return `${m}分${s}秒`;
  }

  return `${s}秒`;
}

function formatDps(dps: number): string {
  if (dps >= 10000) {
    return `${(dps / 10000).toFixed(1)}万`;
  }

  return String(dps);
}

// ─── 主组件 ──────────────────────────────────────────

export default function HardChallengeCard({ data }: { data: HardChallengeData }) {
  const now = new Date();
  const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const diff = data.best?.difficulty ?? 0;
  const diffLabel = diff > 0 ? `${DIFFICULTY_ROMAN[diff] ?? diff} · ${DIFFICULTY_NAMES[diff] ?? '未知'}` : '未挑战';

  return (
    <HTML style={{ width: '700px' }}>
      <div
        style={{
          padding: '24px',
          background: 'linear-gradient(180deg, #1a1520 0%, #2d2435 40%)',
          fontFamily: '"tttgbnumber", system-ui, sans-serif',
          fontSize: '14px',
          color: '#e8e0f0'
        }}
      >
        {/* 头部 */}
        <div
          style={{
            background: 'linear-gradient(135deg, #6a3fa0, #4a2b75)',
            borderRadius: '14px 14px 0 0',
            padding: '14px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#e8d5f5' }}>幽境危战</span>
            <span
              style={{
                fontSize: '12px',
                padding: '2px 8px',
                borderRadius: '4px',
                background: 'rgba(255,255,255,0.15)',
                color: '#d4bfef'
              }}
            >
              {diffLabel}
            </span>
          </div>
          <span style={{ fontSize: '13px', color: '#b8a0d0' }}>UID {data.uid}</span>
        </div>

        {/* 内容 */}
        <div
          style={{
            background: 'rgba(30, 25, 40, 0.9)',
            borderRadius: '0 0 14px 14px',
            padding: '16px 20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
          }}
        >
          {!data.has_data ? (
            <div style={{ textAlign: 'center', padding: '20px 0', color: '#8a7a9e', fontSize: '14px' }}>本期暂无挑战数据</div>
          ) : (
            <>
              {/* 总览信息 */}
              {data.schedule && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                    color: '#a090b8',
                    fontSize: '13px'
                  }}
                >
                  <span>周期</span>
                  <span>
                    {data.schedule.start_time} ~ {data.schedule.end_time}
                  </span>
                </div>
              )}

              {data.best?.has_data && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.08)'
                  }}
                >
                  <span style={{ color: '#a090b8', fontSize: '13px' }}>最佳用时</span>
                  <span style={{ fontWeight: 'bold' }}>{formatTime(data.best.second)}</span>
                </div>
              )}

              {/* 各关卡 */}
              {data.challs.map((chall, ci) => (
                <div
                  key={ci}
                  style={{
                    marginTop: '12px',
                    padding: '12px',
                    background: 'rgba(255,255,255,0.04)',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.06)'
                  }}
                >
                  {/* 关卡标题 */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '8px'
                    }}
                  >
                    <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#d4bfef' }}>{chall.name}</span>
                    <span style={{ fontSize: '12px', color: '#8a7a9e' }}>用时 {formatTime(chall.second)}</span>
                  </div>

                  {/* 怪物等级 */}
                  {chall.monster && (
                    <div
                      style={{
                        fontSize: '12px',
                        color: '#8a7a9e',
                        marginBottom: '6px'
                      }}
                    >
                      Lv.{chall.monster.level}
                    </div>
                  )}

                  {/* 阵容 */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
                    {chall.avatars.map((a, ai) => (
                      <span
                        key={ai}
                        style={{
                          fontSize: '12px',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          background: 'rgba(255,255,255,0.08)',
                          color: RARITY_COLORS[a.rarity] ?? '#e8e0f0'
                        }}
                      >
                        {a.name} Lv.{a.level}
                        {a.rank > 0 && <span style={{ fontSize: '10px', color: '#8a7a9e', marginLeft: '2px' }}>C{a.rank}</span>}
                      </span>
                    ))}
                  </div>

                  {/* 最佳伤害 */}
                  {chall.best_avatars.length > 0 && (
                    <div style={{ display: 'flex', gap: '12px', fontSize: '12px' }}>
                      {chall.best_avatars[0] && <span style={{ color: '#e8a040' }}>最强一击: {formatDps(chall.best_avatars[0].dps)}</span>}
                      {chall.best_avatars[1] && <span style={{ color: '#60b0e0' }}>最高总伤害: {formatDps(chall.best_avatars[1].dps)}</span>}
                    </div>
                  )}
                </div>
              ))}
            </>
          )}
        </div>

        <div style={{ textAlign: 'right', padding: '8px 4px 0', fontSize: '11px', color: '#6a5a80' }}>{dateStr}</div>
      </div>
    </HTML>
  );
}
