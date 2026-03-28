import type { CalendarActivity, CalendarData } from '@src/model/miao/calendar.js';
import React from 'react';
import HTML from './HTML.js';

const GAME_ACCENT: Record<string, string> = {
  gs: '#e8d5b0',
  sr: '#c5b4e3',
  zzz: '#b4e3c5'
};

const TYPE_ICONS: Record<string, string> = {
  character: '🎭',
  weapon: '🗡️',
  abyss: '⚔️',
  pass: '📜',
  activity: '🎉',
  other: '📋'
};

const TYPE_LABELS: Record<string, string> = {
  character: '角色卡池',
  weapon: '武器卡池',
  abyss: '深渊/挑战',
  pass: '纪行/战令',
  activity: '限时活动',
  other: '其他'
};

function ActivityItem({ item }: { item: CalendarActivity }) {
  const activeBg = item.isActive ? 'rgba(76,175,80,0.12)' : 'rgba(255,255,255,0.04)';
  const activeBorder = item.isActive ? '1px solid rgba(76,175,80,0.25)' : '1px solid rgba(255,255,255,0.06)';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 14px',
        background: activeBg,
        borderRadius: '6px',
        border: activeBorder
      }}
    >
      <span style={{ fontSize: '18px', flexShrink: 0 }}>{TYPE_ICONS[item.type] ?? '📋'}</span>
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
        <span
          style={{
            fontSize: '13px',
            fontWeight: 'bold',
            color: '#eee',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {item.title}
        </span>
        <div style={{ display: 'flex', gap: '8px', marginTop: '3px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '11px', color: '#888' }}>{TYPE_LABELS[item.type] ?? '其他'}</span>
          <span style={{ fontSize: '11px', color: item.isActive ? '#81c784' : '#ffb74d' }}>{item.remaining}</span>
        </div>
      </div>
      <div
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: item.isActive ? '#4caf50' : '#bdbdbd',
          flexShrink: 0
        }}
      />
    </div>
  );
}

interface Props {
  data: CalendarData;
}

export default function CalendarCard({ data }: Props) {
  const accent = GAME_ACCENT[data.game] ?? GAME_ACCENT.gs;

  const activeItems = data.activities.filter(a => a.isActive);
  const upcomingItems = data.activities.filter(a => !a.isActive);

  return (
    <HTML style={{ width: '520px' }}>
      <div
        style={{
          padding: '0',
          background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          fontFamily: '"tttgbnumber", "PingFang SC", system-ui, sans-serif',
          fontSize: '14px',
          color: '#eee',
          minHeight: '300px'
        }}
      >
        {/* 头部 */}
        <div
          style={{
            padding: '20px 24px 14px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <span style={{ fontSize: '28px' }}>📅</span>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontSize: '22px',
                fontWeight: 'bold',
                color: '#fff',
                textShadow: '0 0 6px rgba(255,255,255,0.3)'
              }}
            >
              {data.gameName}日历
            </span>
            <span style={{ fontSize: '12px', color: '#999', marginTop: '2px' }}>{data.now}</span>
          </div>
        </div>

        {/* 主体 */}
        <div style={{ padding: '14px 24px' }}>
          {/* 进行中 */}
          {activeItems.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <div
                style={{
                  fontSize: '13px',
                  fontWeight: 'bold',
                  color: accent,
                  marginBottom: '8px',
                  paddingBottom: '4px',
                  borderBottom: `1px solid ${accent}33`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#4caf50',
                    display: 'inline-block'
                  }}
                />
                进行中 ({activeItems.length})
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {activeItems.map(item => (
                  <ActivityItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          )}

          {/* 即将开始 */}
          {upcomingItems.length > 0 && (
            <div>
              <div
                style={{
                  fontSize: '13px',
                  fontWeight: 'bold',
                  color: accent,
                  marginBottom: '8px',
                  paddingBottom: '4px',
                  borderBottom: `1px solid ${accent}33`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#ff9800',
                    display: 'inline-block'
                  }}
                />
                即将开始 ({upcomingItems.length})
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {upcomingItems.map(item => (
                  <ActivityItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          )}

          {data.activities.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                padding: '40px 0',
                color: '#666',
                fontSize: '14px'
              }}
            >
              暂无活动数据
            </div>
          )}
        </div>

        {/* 底部 */}
        <div
          style={{
            padding: '10px 24px 16px',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            fontSize: '11px',
            color: '#777',
            textAlign: 'center'
          }}
        >
          数据来自米游社公告 · {data.now}
        </div>
      </div>
    </HTML>
  );
}
