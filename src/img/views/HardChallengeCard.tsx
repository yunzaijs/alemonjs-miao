/**
 * 幽境危战卡片 — 显示挑战关卡、阵容、最佳伤害
 */
import React from 'react';
import HTML from './HTML.js';
import { FONT_FAMILY, FONT_NZBZ, RARITY_COLORS, contStyle } from './shared.js';

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
  const diff = data.best?.difficulty ?? 0;
  const diffLabel = diff > 0 ? `${DIFFICULTY_ROMAN[diff] ?? diff} · ${DIFFICULTY_NAMES[diff] ?? '未知'}` : '未挑战';

  return (
    <HTML style={{ width: '840px' }}>
      <div
        style={{
          width: '840px',
          fontFamily: FONT_FAMILY,
          fontSize: '16px',
          color: '#fff',
          background: '#23212d'
        }}
      >
        <div
          style={{
            width: '840px',
            padding: '5px 0 10px 5px'
          }}
        >
          {/* head-box */}
          <div style={{ display: 'flex', width: '100%', padding: '10px 0' }}>
            <div style={{ width: '70%' }}>
              <div style={{ fontFamily: FONT_NZBZ, fontSize: '45px', paddingBottom: '10px' }}>#幽境危战</div>
            </div>
            <div style={{ width: '30%', textAlign: 'right', paddingTop: '25px', paddingRight: '10px', fontSize: '25px' }}>UID:{data.uid}</div>
          </div>
          <div style={{ padding: '0 20px', fontSize: '18px' }}>
            统计周期：{data.schedule?.start_time} - {data.schedule?.end_time}
          </div>

          {!data.has_data ? (
            <div style={contStyle()}>
              <div style={{ textAlign: 'center', padding: '30px 0', color: '#fff', fontSize: '14px' }}>本期暂无挑战数据</div>
            </div>
          ) : (
            <>
              {/* 总览 — hard-stat-cont */}
              {(data.schedule || data.best?.has_data) && (
                <div style={{ margin: '0 20px 10px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', padding: '5px 10px', height: '57px', justifyContent: 'space-between' }}>
                    <div style={{ padding: '5px 10px', fontFamily: FONT_NZBZ, fontSize: '20px' }}>最佳纪录</div>
                    {data.best?.has_data && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontWeight: 'bold', fontSize: '20px' }}>{diffLabel}</span>
                        <span style={{ fontSize: '20px' }}>{formatTime(data.best.second)}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 各关卡 — hard-chall-team layout */}
              {data.challs.map((chall, ci) => (
                <div key={ci} style={contStyle()}>
                  <div style={{ padding: '11px' }}>
                    {/* hard-title */}
                    <div
                      style={{
                        margin: '-3px 0 8px 3px',
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                        color: '#d3bc8e',
                        fontSize: '22px',
                        fontFamily: FONT_NZBZ,
                        fontWeight: 'normal'
                      }}
                    >
                      <div>{chall.name}</div>
                      <div style={{ fontSize: '20px', fontFamily: FONT_FAMILY }}>
                        <span>战斗用时：</span>
                        {formatTime(chall.second)}
                      </div>
                    </div>
                    {/* hard-chall-team */}
                    <div style={{ display: 'flex' }}>
                      {/* hard-team — avatars */}
                      <div style={{ display: 'flex', marginRight: '-5px', marginLeft: '-5px', gap: '4px' }}>
                        {chall.avatars.map((a, ai) => (
                          <div
                            key={ai}
                            style={{
                              fontSize: '13px',
                              padding: '3px 10px',
                              borderRadius: '4px',
                              background: 'rgba(0,0,0,0.3)',
                              color: RARITY_COLORS[a.rarity] ?? '#fff'
                            }}
                          >
                            {a.name} Lv.{a.level}
                            {a.rank > 0 && <span style={{ fontSize: '11px', color: '#d3bc8e', marginLeft: '2px' }}>C{a.rank}</span>}
                          </div>
                        ))}
                      </div>
                      <div style={{ width: '1px', background: 'rgba(255,255,255,0.5)', height: '80px', margin: '15px 8px 0' }} />
                      {/* hard-info — best damage */}
                      <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
                        {chall.monster && <div style={{ fontSize: '13px', color: '#d3bc8e', marginBottom: '6px' }}>Lv.{chall.monster.level}</div>}
                        {chall.best_avatars.length > 0 && (
                          <div style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', gap: '10px' }}>
                              {chall.best_avatars[0] && (
                                <div style={{ background: '#e7e5d9', borderRadius: '10px', overflow: 'hidden', flex: 1 }}>
                                  <div style={{ background: '#8b8b83', padding: '5px', fontSize: '18px', color: '#fff' }}>最强一击</div>
                                  <div style={{ padding: '5px', color: '#0d0d0d', fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>
                                    {formatDps(chall.best_avatars[0].dps)}
                                  </div>
                                </div>
                              )}
                              {chall.best_avatars[1] && (
                                <div style={{ background: '#e7e5d9', borderRadius: '10px', overflow: 'hidden', flex: 1 }}>
                                  <div style={{ background: '#8b8b83', padding: '5px', fontSize: '18px', color: '#fff' }}>最高总伤害</div>
                                  <div style={{ padding: '5px', color: '#0d0d0d', fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>
                                    {formatDps(chall.best_avatars[1].dps)}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* hard-chall-desc */}
                    {chall.monster?.desc && chall.monster.desc.length > 0 && (
                      <div style={{ margin: '3px 0' }}>
                        <ul style={{ listStylePosition: 'inside' }}>
                          {chall.monster.desc.map((d, di) => (
                            <li key={di} style={{ fontSize: '15px' }}>
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </>
          )}

          {/* notice */}
          <div style={contStyle()}>
            <div style={{ padding: '10px 15px', fontSize: '16px' }}>
              <div>角色装备与圣遗物为当前最新状态</div>
            </div>
          </div>

          <div style={{ fontSize: '14px', textAlign: 'center', color: '#fff', textShadow: '1px 1px 1px #000', margin: '10px 0' }}>Miao By ALemonJS</div>
        </div>
      </div>
    </HTML>
  );
}
