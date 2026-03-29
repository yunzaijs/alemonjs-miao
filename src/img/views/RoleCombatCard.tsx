/**
 * 幻想真境剧诗卡片 — 显示各幕阵容、统计数据
 */
import React from 'react';
import HTML from './HTML.js';
import { FONT_FAMILY, FONT_NZBZ, RARITY_COLORS, contStyle, contTitleStyle } from './shared.js';

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
    <HTML style={{ width: '970px' }}>
      <div
        style={{
          width: '970px',
          fontFamily: FONT_FAMILY,
          fontSize: '16px',
          color: '#fff',
          background: '#151214'
        }}
      >
        <div
          style={{
            width: '970px',
            padding: '5px 0 10px 5px'
          }}
        >
          {/* head-box — flex 70/30 */}
          <div style={{ display: 'flex', width: '100%', padding: '10px 0' }}>
            <div style={{ width: '70%' }}>
              <div style={{ fontFamily: FONT_NZBZ, fontSize: '45px', paddingBottom: '10px' }}>
                #幻想真境剧诗
                {stat && (
                  <span style={{ fontSize: '30px', marginLeft: '10px', color: '#d3bc8e' }}>{schedule ? `${schedule.start_date_time.month}月` : ''}</span>
                )}
              </div>
            </div>
            <div style={{ width: '30%', textAlign: 'right', paddingTop: '25px', paddingRight: '10px', fontSize: '25px' }}>UID:{data.uid}</div>
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
              {/* 演出回顾 — role-stat-cont */}
              <div style={{ width: '100%', padding: '40px 80px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px', margin: '10px 0' }}>
                <div style={{ color: '#d3bc8e', fontSize: '43px', lineHeight: '35px', textAlign: 'center', fontFamily: FONT_NZBZ, marginBottom: '30px' }}>
                  演出回顾
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', color: '#ccc', margin: '30px 25px 0' }}>
                  {schedule && (
                    <div style={{ display: 'flex', width: '100%', height: '76px', alignItems: 'center', fontSize: '26px' }}>
                      <div style={{ width: '50%' }}>周期</div>
                      <div style={{ width: '100%', fontSize: '26px', display: 'flex', justifyContent: 'flex-end' }}>
                        {schedule.start_date_time.month}/{schedule.start_date_time.day} ~ {schedule.end_date_time.month}/{schedule.end_date_time.day}
                      </div>
                    </div>
                  )}
                  {stat && (
                    <>
                      <div style={{ display: 'flex', width: '100%', height: '76px', alignItems: 'center', fontSize: '26px' }}>
                        <div style={{ width: '50%' }}>最深幕数</div>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>第{stat.max_round_id}幕</div>
                      </div>
                      <div style={{ display: 'flex', width: '100%', height: '76px', alignItems: 'center', fontSize: '26px' }}>
                        <div style={{ width: '50%' }}>异端值</div>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>{stat.heresy_count}</div>
                      </div>
                      <div style={{ display: 'flex', width: '100%', height: '76px', alignItems: 'center', fontSize: '26px' }}>
                        <div style={{ width: '50%' }}>消耗幻剧之花</div>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>{stat.coin_num}</div>
                      </div>
                      <div style={{ display: 'flex', width: '100%', height: '76px', alignItems: 'center', fontSize: '26px' }}>
                        <div style={{ width: '50%' }}>场外观众声援</div>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>{stat.avatar_bonus_num} 次</div>
                      </div>
                      <div style={{ display: 'flex', width: '100%', height: '76px', alignItems: 'center', fontSize: '26px' }}>
                        <div style={{ width: '50%' }}>支援其他玩家</div>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>{stat.rent_cnt} 次</div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* 各幕阵容 — role-title + role-team */}
              {detail &&
                detail.rounds_data.length > 0 &&
                detail.rounds_data.map((round, ri) => (
                  <div key={ri} style={contStyle()}>
                    <div style={{ padding: '11px' }}>
                      {/* role-title */}
                      <div style={{ margin: '-3px 0 8px', display: 'flex', alignItems: 'flex-end' }}>
                        {round.is_get_medal && <span style={{ fontSize: '14px', color: '#c6923a', marginRight: '4px' }}>✦</span>}
                        <strong
                          style={{ marginLeft: '3px', color: '#d3bc8e', fontSize: '18px', fontFamily: FONT_NZBZ, fontWeight: 'normal', marginRight: '10px' }}
                        >
                          第{round.round_id}幕
                        </strong>
                      </div>
                      {/* role-team — avatars */}
                      <div style={{ display: 'flex', gap: '10px' }}>
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
                    </div>
                  </div>
                ))}

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

          {/* notice */}
          <div style={contStyle()}>
            <div style={{ padding: '10px 15px', fontSize: '16px' }}>
              <div>各关卡按照挑战时间顺序展示</div>
              <div>角色装备与圣遗物为当前最新状态</div>
            </div>
          </div>

          <div style={{ fontSize: '14px', textAlign: 'center', color: '#fff', textShadow: '1px 1px 1px #000', margin: '10px 0' }}>Miao By ALemonJS</div>
        </div>
      </div>
    </HTML>
  );
}
