/**
 * 幻想真境剧诗卡片 — 显示各幕阵容、统计数据
 */
import React from 'react';
import HTML from './HTML.js';
import { FONT_FAMILY, FONT_NZBZ, RARITY_COLORS, URL_BG01, URL_MAIN01, contStyle, contTitleStyle, formatDateZh } from './shared.js';

// ─── 类型定义 ────────────────────────────────────────

export interface CombatRound {
  avatars: Array<{
    avatar_id: number;
    avatar_type: number;
    name: string;
    element: string;
    level: number;
    rarity: number;
  }>;
  choice_cards: Array<{ name: string; desc: string }>;
  buffs: Array<{ name: string; desc: string }>;
  round_id: number;
  is_get_medal: boolean;
}

export interface CombatDetail {
  rounds_data: CombatRound[];
  detail_stat: {
    difficulty_id: number;
    max_round_id: number;
    avatar_bonus_num: number;
    rent_cnt: number;
  };
  backup_avatars: Array<{
    avatar_id: number;
    name: string;
    level: number;
    rarity: number;
  }>;
}

export interface CombatSchedule {
  start_time: number;
  end_time: number;
  schedule_type: number;
  schedule_id: number;
  start_date_time: { year: string; month: string; day: string };
  end_date_time: { year: string; month: string; day: string };
}

export interface CombatStat {
  difficulty_id: number;
  max_round_id: number;
  heresy_count: number;
  avatar_bonus_num: number;
  rent_cnt: number;
  coin_num: number;
}

export interface RoleCombatData {
  uid: string;
  has_data: boolean;
  has_detail_data: boolean;
  data: Array<{
    detail: CombatDetail;
    stat: CombatStat;
    schedule: CombatSchedule;
  }>;
}

// ─── 样式 ────────────────────────────────────────────

function StatRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '6px 0',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        color: '#fff',
        fontSize: '14px'
      }}
    >
      <span style={{ color: '#d3bc8e' }}>{label}</span>
      <span style={{ fontWeight: 'bold' }}>{value}</span>
    </div>
  );
}

// ─── 主组件 ──────────────────────────────────────────

export default function RoleCombatCard({ data }: { data: RoleCombatData }) {
  const noData = !data.has_data || data.data.length === 0;
  const noDetail = data.has_data && !data.has_detail_data;

  let schedule: CombatSchedule | undefined;
  let stat: CombatStat | undefined;
  let detail: CombatDetail | undefined;

  if (!noData) {
    schedule = data.data[0].schedule;
    stat = data.data[0].stat;
    detail = data.data[0].detail;
  }

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
              幻想真境剧诗
              <span
                style={{
                  display: 'inline-block',
                  marginLeft: '10px',
                  fontSize: '16px',
                  fontFamily: FONT_FAMILY,
                  textShadow: '0 0 1px #000, 1px 1px 3px rgba(0,0,0,0.9)'
                }}
              >
                UID:{data.uid}
              </span>
            </div>
          </div>

          {noData ? (
            <div style={contStyle()}>
              <div style={{ textAlign: 'center', padding: '30px 0', color: '#fff', fontSize: '14px' }}>本期暂无挑战数据</div>
            </div>
          ) : noDetail ? (
            <div style={contStyle()}>
              <div style={{ textAlign: 'center', padding: '30px 0', color: '#fff', fontSize: '14px' }}>数据还没更新，请稍后再试</div>
            </div>
          ) : (
            <>
              {/* 统计 */}
              <div style={contStyle()}>
                <div style={contTitleStyle()}>挑战统计</div>
                <div style={{ padding: '8px 15px' }}>
                  {schedule && (
                    <StatRow
                      label='周期'
                      value={
                        // eslint-disable-next-line no-useless-concat
                        `${schedule.start_date_time.month}/${schedule.start_date_time.day}` + ` ~ ${schedule.end_date_time.month}/${schedule.end_date_time.day}`
                      }
                    />
                  )}
                  {stat && (
                    <>
                      <StatRow label='最深幕数' value={`第${stat.max_round_id}幕`} />
                      <StatRow label='异端值' value={stat.heresy_count} />
                      <StatRow label='获取金币' value={stat.coin_num} />
                      <StatRow label='助战次数' value={`${stat.rent_cnt}次`} />
                    </>
                  )}
                </div>
              </div>

              {/* 各幕阵容 */}
              {detail && detail.rounds_data.length > 0 && (
                <div style={contStyle()}>
                  <div style={contTitleStyle()}>各幕阵容</div>
                  <div style={{ padding: '8px 15px' }}>
                    {detail.rounds_data.map((round, ri) => (
                      <div key={ri} style={{ padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                          <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#d3bc8e' }}>第{round.round_id}幕</span>
                          {round.is_get_medal && <span style={{ fontSize: '14px', color: '#c6923a' }}>✦ 勋章</span>}
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                          {round.avatars.map((a, ai) => (
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
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 候选角色 */}
              {detail && detail.backup_avatars.length > 0 && (
                <div style={contStyle()}>
                  <div style={contTitleStyle()}>候选角色</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', padding: '10px 15px' }}>
                    {detail.backup_avatars.map((a, ai) => (
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
                      </span>
                    ))}
                  </div>
                </div>
              )}
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
