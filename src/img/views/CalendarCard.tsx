import type { CalendarActivity, CalendarData, DateEntry } from '@src/model/miao/calendar.js';
import React from 'react';
import HTML from './HTML.js';
import { FONT_FAMILY, FONT_NZBZ, elemBgUrl } from './shared.js';

// ─── 颜色主题 ────────────────────────────────────────

const BAR_COLORS: Record<string, { bg: string; border: string }> = {
  character: { bg: '#e7ddd1', border: '#c4a46e' },
  weapon: { bg: '#e2dbe5', border: '#a07db5' },
  pass: { bg: '#dde7dd', border: '#7db57d' },
  activity: { bg: '#e8e2d8', border: '#c4a46e' },
  abyss: { bg: '#333465', border: '#5555aa' },
  other: { bg: '#e8e2d8', border: '#aaa' }
};

const ABYSS_COLORS = ['#333465', '#1a3061'];

// ─── 日期表头 ────────────────────────────────────────

function DateHeader({ dateList, nowDate }: { dateList: DateEntry[]; nowDate: number }) {
  const totalCols = dateList.reduce((n, e) => n + e.dates.length, 0);
  const colW = `${(100 / totalCols).toFixed(4)}%`;

  return (
    <div style={{ background: 'rgba(0,0,0,0.8)', borderRadius: '6px 6px 0 0', overflow: 'hidden' }}>
      {/* 月份行 */}
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        {dateList.map(entry => (
          <div
            key={entry.month}
            style={{
              width: `${((entry.dates.length / totalCols) * 100).toFixed(4)}%`,
              textAlign: 'center',
              color: '#d3bc8e',
              fontSize: '13px',
              fontWeight: 'bold',
              padding: '4px 0'
            }}
          >
            {entry.month}月
          </div>
        ))}
      </div>
      {/* 日期 + 星期行 */}
      <div style={{ display: 'flex' }}>
        {dateList.map(entry => entry.dates.map(d => {
            const isCur = d.day === nowDate;

            return (
              <div
                key={`${entry.month}-${d.day}`}
                style={{
                  width: colW,
                  textAlign: 'center',
                  padding: '3px 0 4px',
                  color: isCur ? '#d3bc8e' : 'rgba(255,255,255,0.6)',
                  fontWeight: isCur ? 'bold' : 'normal',
                  fontSize: '12px',
                  background: isCur ? 'rgba(211,188,142,0.15)' : 'transparent',
                  borderLeft: '1px solid rgba(255,255,255,0.05)'
                }}
              >
                <div>{d.day}</div>
                <div style={{ fontSize: '10px', marginTop: '1px' }}>{d.weekday}</div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

// ─── 活动条 ──────────────────────────────────────────

function ActivityBar({ item, isSecond }: { item: CalendarActivity; isSecond?: boolean }) {
  const colors = BAR_COLORS[item.type] ?? BAR_COLORS.other;
  const isAbyss = item.type === 'abyss';
  const isChar = item.type === 'character';
  const barH = isChar ? 90 : 56;

  return (
    <div
      style={{
        position: 'absolute',
        left: `${item.left}%`,
        width: `${item.width}%`,
        height: `${barH}px`,
        top: isSecond ? '0px' : '0px',
        borderRadius: '5px',
        overflow: 'hidden',
        background: isAbyss ? `linear-gradient(135deg, ${ABYSS_COLORS[0]}, ${ABYSS_COLORS[1]})` : colors.bg,
        borderLeft: `3px solid ${colors.border}`,
        boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
      }}
    >
      {/* banner 背景 */}
      {item.banner && !isAbyss && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: '50%',
            height: '100%',
            backgroundImage: `url(${item.banner})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.25
          }}
        />
      )}
      {/* 内容 */}
      <div
        style={{
          position: 'relative',
          padding: isChar ? '6px 10px' : '4px 10px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100%'
        }}
      >
        {/* icon + title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {item.icon && (
            <img
              src={item.icon}
              style={{
                width: isChar ? '28px' : '22px',
                height: isChar ? '28px' : '22px',
                borderRadius: '4px',
                objectFit: 'cover'
              }}
            />
          )}
          <span
            style={{
              fontSize: isChar ? '14px' : '12px',
              fontWeight: 'bold',
              color: isAbyss ? '#d3bc8e' : '#3b3b3b',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '90%'
            }}
          >
            {item.title}
          </span>
        </div>
        {/* label */}
        <div
          style={{
            fontSize: '10px',
            color: isAbyss ? 'rgba(255,255,255,0.7)' : 'rgba(60,60,60,0.8)',
            marginTop: '3px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {item.label}
        </div>
        {/* 状态 */}
        <div
          style={{
            fontSize: '10px',
            color: item.isActive ? (isAbyss ? '#7dda7d' : '#2e7d32') : isAbyss ? '#ffb74d' : '#e65100',
            marginTop: '2px',
            fontWeight: 'bold'
          }}
        >
          {item.remaining}
        </div>
      </div>
    </div>
  );
}

// ─── 当前时间线 ──────────────────────────────────────

function NowLine({ nowLeft }: { nowLeft: number }) {
  return (
    <>
      {/* 竖线 */}
      <div
        style={{
          position: 'absolute',
          left: `${nowLeft}%`,
          top: 0,
          bottom: 0,
          width: '2px',
          background: '#fff',
          boxShadow: '0 0 6px rgba(255,255,255,0.6)',
          zIndex: 10
        }}
      />
      {/* 三角 */}
      <div
        style={{
          position: 'absolute',
          left: `${nowLeft}%`,
          bottom: '-8px',
          marginLeft: '-5px',
          width: 0,
          height: 0,
          borderLeft: '5px solid transparent',
          borderRight: '5px solid transparent',
          borderBottom: '8px solid #fff',
          zIndex: 10
        }}
      />
    </>
  );
}

// ─── 主组件 ──────────────────────────────────────────

interface Props {
  data: CalendarData;
}

export default function CalendarCard({ data }: Props) {
  // 甘特图行高
  const ROW_H = 62;
  const CHAR_ROW_H = 96;
  const ABYSS_ROW_H = 62;
  const GAP = 6;

  const rows = data.rows ?? [];
  const abyssRows = data.abyssRows ?? [];
  const dateList = data.dateList ?? [];

  // 计算甘特图总高度
  let chartH = 0;

  for (const row of rows) {
    const hasChar = row.some(r => r.type === 'character');

    chartH += (hasChar ? CHAR_ROW_H : ROW_H) + GAP;
  }

  const abyssH = abyssRows.length > 0 ? ABYSS_ROW_H + GAP : 0;
  const totalChartH = chartH + abyssH + 20;

  return (
    <HTML style={{ width: '960px' }}>
      <div
        style={{
          width: '960px',
          fontFamily: FONT_FAMILY,
          fontSize: '16px',
          color: '#1e1f20',
          backgroundImage: `url(${elemBgUrl()})`,
          backgroundSize: '100% auto',
          backgroundPosition: 'left top'
        }}
      >
        <div style={{ width: '960px', padding: '20px 15px 10px 15px' }}>
          {/* 标题 */}
          <div style={{ padding: '10px 20px', color: '#fff', marginTop: '10px' }}>
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

          {/* 日历主体 */}
          <div
            style={{
              margin: '10px 10px 5px',
              borderRadius: '8px',
              overflow: 'hidden',
              background: 'rgba(0,0,0,0.25)',
              boxShadow: '0 0 1px 0 #ccc, 2px 2px 4px 0 rgba(50,50,50,0.8)'
            }}
          >
            {/* 日期表头 */}
            <DateHeader dateList={dateList} nowDate={data.nowDate ?? 0} />

            {/* 甘特图区域 */}
            <div
              style={{
                position: 'relative',
                height: `${totalChartH}px`,
                padding: '10px 0'
              }}
            >
              {/* 当前时间线 */}
              <NowLine nowLeft={data.nowLeft ?? 50} />

              {/* 深渊行 */}
              {abyssRows.map((ab, idx) => (
                <div
                  key={`abyss-${idx}`}
                  style={{
                    position: 'relative',
                    height: `${ABYSS_ROW_H}px`,
                    marginBottom: `${GAP}px`
                  }}
                >
                  <ActivityBar item={ab} />
                </div>
              ))}

              {/* 活动行 */}
              {rows.map((row, ri) => {
                const hasChar = row.some(r => r.type === 'character');
                const h = hasChar ? CHAR_ROW_H : ROW_H;

                return (
                  <div
                    key={`row-${ri}`}
                    style={{
                      position: 'relative',
                      height: `${h}px`,
                      marginBottom: `${GAP}px`
                    }}
                  >
                    {row.map((item, ci) => (
                      <ActivityBar key={item.id || ci} item={item} isSecond={ci === 1} />
                    ))}
                  </div>
                );
              })}

              {/* 空态 */}
              {rows.length === 0 && abyssRows.length === 0 && (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '40px 0',
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: '14px'
                  }}
                >
                  暂无活动数据
                </div>
              )}
            </div>
          </div>

          {/* 当前时间标签 */}
          <div
            style={{
              textAlign: 'center',
              margin: '6px 0',
              fontSize: '12px',
              color: '#fff',
              textShadow: '0 0 4px rgba(0,0,0,0.5)'
            }}
          >
            <span
              style={{
                background: 'rgba(0,0,0,0.5)',
                padding: '3px 14px',
                borderRadius: '10px'
              }}
            >
              当前时间 {data.nowTime}
            </span>
          </div>

          {/* 底部 */}
          <div
            style={{
              display: 'flex',
              background: 'rgba(0,0,0,0.4)',
              padding: '10px 15px',
              fontSize: '12px',
              color: '#fff',
              borderRadius: '0 0 10px 10px',
              margin: '5px 10px'
            }}
          >
            <span style={{ flex: 1 }}>数据来自米游社公告</span>
            <span>日历数据每10分钟更新</span>
          </div>

          <div
            style={{
              fontSize: '14px',
              textAlign: 'center',
              color: '#fff',
              textShadow: '1px 1px 1px #000',
              margin: '10px 0'
            }}
          >
            Miao By ALemonJS
          </div>
        </div>
      </div>
    </HTML>
  );
}
