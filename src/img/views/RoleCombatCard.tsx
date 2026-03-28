/**
 * 幻想真境剧诗卡片 — 显示各幕阵容、统计数据
 */
import React from 'react';
import HTML from './HTML.js';
import { FONT_FAMILY, RARITY_COLORS, formatDate } from './shared.js';

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
        padding: '8px 0',
        borderBottom: '1px solid #f0ede8'
      }}
    >
      <span style={{ color: '#6b5e4f', fontSize: '13px' }}>{label}</span>
      <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{value}</span>
    </div>
  );
}

// ─── 主组件 ──────────────────────────────────────────

export default function RoleCombatCard({ data }: { data: RoleCombatData }) {
  const dateStr = formatDate();

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
          padding: '24px',
          background: 'linear-gradient(180deg, #f0ebe3 0%, #f5f6fb 40%)',
          fontFamily: FONT_FAMILY,
          fontSize: '14px',
          color: '#1e1f20'
        }}
      >
        {/* 头部 */}
        <div
          style={{
            background: 'linear-gradient(135deg, #e8d5b0, #d3bc8e)',
            borderRadius: '14px 14px 0 0',
            padding: '14px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        >
          <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#4a3c2a' }}>幻想真境剧诗</span>
          <span style={{ fontSize: '13px', color: '#7a6b57' }}>UID {data.uid}</span>
        </div>

        {/* 内容 */}
        <div
          style={{
            background: '#fff',
            borderRadius: '0 0 14px 14px',
            padding: '16px 20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
          }}
        >
          {noData ? (
            <div style={{ textAlign: 'center', padding: '20px 0', color: '#9e8e7e', fontSize: '14px' }}>本期暂无挑战数据</div>
          ) : noDetail ? (
            <div style={{ textAlign: 'center', padding: '20px 0', color: '#9e8e7e', fontSize: '14px' }}>数据还没更新，请稍后再试</div>
          ) : (
            <>
              {schedule && (
                <StatRow
                  label='周期'
                  value={`${schedule.start_date_time.month}/${schedule.start_date_time.day} ~ ${schedule.end_date_time.month}/${schedule.end_date_time.day}`}
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

              {detail && detail.rounds_data.length > 0 && (
                <>
                  <div
                    style={{
                      fontSize: '13px',
                      color: '#9e8e7e',
                      borderBottom: '1px solid #f0ede8',
                      paddingBottom: '6px',
                      marginBottom: '8px',
                      marginTop: '12px'
                    }}
                  >
                    各幕阵容
                  </div>
                  {detail.rounds_data.map((round, ri) => (
                    <div key={ri} style={{ padding: '8px 0', borderBottom: '1px solid #f8f6f2' }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '4px'
                        }}
                      >
                        <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#4a3c2a' }}>第{round.round_id}幕</span>
                        {round.is_get_medal && <span style={{ fontSize: '14px', color: '#c6923a' }}>✦ 勋章</span>}
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {round.avatars.map((a, ai) => (
                          <span
                            key={ai}
                            style={{
                              fontSize: '12px',
                              padding: '2px 8px',
                              borderRadius: '4px',
                              background: '#f8f6f2',
                              color: RARITY_COLORS[a.rarity] ?? '#1e1f20'
                            }}
                          >
                            {a.name} Lv.{a.level}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              )}

              {detail && detail.backup_avatars.length > 0 && (
                <>
                  <div
                    style={{
                      fontSize: '13px',
                      color: '#9e8e7e',
                      borderBottom: '1px solid #f0ede8',
                      paddingBottom: '6px',
                      marginBottom: '8px',
                      marginTop: '12px'
                    }}
                  >
                    候选角色
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {detail.backup_avatars.map((a, ai) => (
                      <span
                        key={ai}
                        style={{
                          fontSize: '12px',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          background: '#f8f6f2',
                          color: RARITY_COLORS[a.rarity] ?? '#1e1f20'
                        }}
                      >
                        {a.name} Lv.{a.level}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <div style={{ textAlign: 'right', padding: '8px 4px 0', fontSize: '11px', color: '#b0a89c' }}>{dateStr}</div>
      </div>
    </HTML>
  );
}
