import type { CalendarActivity, CalendarData } from '@src/model/miao/calendar.js';
import React from 'react';
import HTML from './HTML.js';
import { FONT_FAMILY, FONT_NZBZ, URL_BG01, URL_MAIN01, contStyle, contTitleStyle, formatDateZh } from './shared.js';

const TYPE_LABELS: Record<string, string> = {
  character: '角色卡池',
  weapon: '武器卡池',
  abyss: '深渊/挑战',
  pass: '纪行/战令',
  activity: '限时活动',
  other: '其他'
};

function ActivityItem({ item }: { item: CalendarActivity }) {
  const activeBg = item.isActive ? 'rgba(76,175,80,0.15)' : 'rgba(0,0,0,0.15)';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '8px 14px',
        background: activeBg,
        borderRadius: '4px',
        marginBottom: '2px'
      }}
    >
      <div
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: item.isActive ? '#4caf50' : '#ff9800',
          flexShrink: 0
        }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
        <span
          style={{
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#fff',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {item.title}
        </span>
        <div style={{ display: 'flex', gap: '8px', marginTop: '3px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '12px', color: '#d3bc8e' }}>{TYPE_LABELS[item.type] ?? '其他'}</span>
          <span style={{ fontSize: '12px', color: item.isActive ? '#81c784' : '#ffb74d' }}>{item.remaining}</span>
        </div>
      </div>
    </div>
  );
}

interface Props {
  data: CalendarData;
}

export default function CalendarCard({ data }: Props) {
  const activeItems = data.activities.filter(a => a.isActive);
  const upcomingItems = data.activities.filter(a => !a.isActive);

  return (
    <HTML style={{ width: '740px' }}>
      <div
        style={{
          width: '740px',
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
            width: '740px',
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
              {data.gameName}日历
            </div>
            <div style={{ fontSize: '14px', textShadow: '0 0 1px #000, 1px 1px 3px rgba(0,0,0,0.9)' }}>{data.now}</div>
          </div>

          {/* 进行中 */}
          {activeItems.length > 0 && (
            <div style={contStyle()}>
              <div style={contTitleStyle()}>进行中 ({activeItems.length})</div>
              <div style={{ padding: '8px 10px' }}>
                {activeItems.map(item => (
                  <ActivityItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          )}

          {/* 即将开始 */}
          {upcomingItems.length > 0 && (
            <div style={contStyle()}>
              <div style={contTitleStyle()}>即将开始 ({upcomingItems.length})</div>
              <div style={{ padding: '8px 10px' }}>
                {upcomingItems.map(item => (
                  <ActivityItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          )}

          {data.activities.length === 0 && (
            <div style={contStyle()}>
              <div style={{ width: '100%', textAlign: 'center', padding: '40px 0', color: '#fff', fontSize: '14px' }}>暂无活动数据</div>
            </div>
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
            <span style={{ width: '50%' }}>数据来自米游社公告</span>
            <span style={{ width: '50%', textAlign: 'right' }}>{formatDateZh()}</span>
          </div>

          <div style={{ fontSize: '14px', textAlign: 'center', color: '#fff', textShadow: '1px 1px 1px #000', margin: '10px 0' }}> AlemonJS</div>
        </div>
      </div>
    </HTML>
  );
}
