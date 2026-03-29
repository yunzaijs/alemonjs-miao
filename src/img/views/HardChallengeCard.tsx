/**
 * 幽境危战卡片 — 显示挑战关卡、阵容、最佳伤害
 */
import React from 'react';
import HTML from './HTML.js';
import { FONT_FAMILY, FONT_NZBZ, RARITY_COLORS, URL_BG01, URL_MAIN01, contStyle, contTitleStyle, formatDateZh } from './shared.js';

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
    <HTML style={{ width: '700px' }}>
      <div
        style={{
          width: '700px',
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
            width: '700px',
            padding: '20px 15px 10px 15px',
            backgroundImage: `url(${URL_MAIN01})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center -25px'
          }}
        >
          {/* head-box */}
          <div style={{ borderRadius: '15px', padding: '10px 20px', color: '#fff', marginTop: '10px' }}>
            <div
              style={{
                fontFamily: FONT_NZBZ,
                fontSize: '36px',
                textShadow: '0 0 1px #000, 1px 1px 3px rgba(0,0,0,0.9)'
              }}
            >
              幽境危战
              <span
                style={{
                  display: 'inline-block',
                  marginLeft: '10px',
                  fontSize: '16px',
                  fontFamily: FONT_FAMILY,
                  textShadow: '0 0 1px #000, 1px 1px 3px rgba(0,0,0,0.9)'
                }}
              >
                UID:{data.uid} · {diffLabel}
              </span>
            </div>
          </div>

          {!data.has_data ? (
            <div style={contStyle()}>
              <div style={{ textAlign: 'center', padding: '30px 0', color: '#fff', fontSize: '14px' }}>本期暂无挑战数据</div>
            </div>
          ) : (
            <>
              {/* 总览 */}
              {(data.schedule || data.best?.has_data) && (
                <div style={contStyle()}>
                  <div style={contTitleStyle()}>总览</div>
                  <div style={{ padding: '8px 15px' }}>
                    {data.schedule && (
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          padding: '6px 0',
                          color: '#fff',
                          fontSize: '14px',
                          borderBottom: '1px solid rgba(255,255,255,0.1)'
                        }}
                      >
                        <span style={{ color: '#d3bc8e' }}>周期</span>
                        <span>
                          {data.schedule.start_time} ~ {data.schedule.end_time}
                        </span>
                      </div>
                    )}
                    {data.best?.has_data && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', color: '#fff', fontSize: '14px' }}>
                        <span style={{ color: '#d3bc8e' }}>最佳用时</span>
                        <span style={{ fontWeight: 'bold' }}>{formatTime(data.best.second)}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 各关卡 */}
              {data.challs.map((chall, ci) => (
                <div key={ci} style={contStyle()}>
                  <div style={contTitleStyle({ display: 'flex', justifyContent: 'space-between' })}>
                    <span>{chall.name}</span>
                    <span style={{ fontWeight: 'normal', fontSize: '13px' }}>用时 {formatTime(chall.second)}</span>
                  </div>
                  <div style={{ padding: '8px 15px' }}>
                    {chall.monster && <div style={{ fontSize: '13px', color: '#d3bc8e', marginBottom: '6px' }}>Lv.{chall.monster.level}</div>}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
                      {chall.avatars.map((a, ai) => (
                        <span
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
                        </span>
                      ))}
                    </div>
                    {chall.best_avatars.length > 0 && (
                      <div style={{ display: 'flex', gap: '12px', fontSize: '13px' }}>
                        {chall.best_avatars[0] && <span style={{ color: '#e8a040' }}>最强一击: {formatDps(chall.best_avatars[0].dps)}</span>}
                        {chall.best_avatars[1] && <span style={{ color: '#60b0e0' }}>最高总伤害: {formatDps(chall.best_avatars[1].dps)}</span>}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </>
          )}

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
            <span style={{ width: '50%' }}>数据来源: 米游社</span>
            <span style={{ width: '50%', textAlign: 'right' }}>{formatDateZh()}</span>
          </div>

          <div style={{ fontSize: '14px', textAlign: 'center', color: '#fff', textShadow: '1px 1px 1px #000', margin: '10px 0' }}> AlemonJS</div>
        </div>
      </div>
    </HTML>
  );
}
