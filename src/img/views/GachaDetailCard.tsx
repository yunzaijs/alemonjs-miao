/**
 * 抽卡记录卡片 — 对齐老版 gacha-detail 模板: 年份时间线 + 进度条
 */
import type { GachaAnalysis } from '@src/model/miao/gachaLog.js';
import React from 'react';
import HTML from './HTML.js';
import { FONT_FAMILY, FONT_NZBZ, URL_ITEM_BG5, contStyle, elemBgUrl } from './shared.js';

export interface GachaDetailCardData {
  uid: string;
  game: string;
  analysis: GachaAnalysis;
}

/** 进度条颜色 — 对齐老版 gold/good/normal/bad */
function barClass(count: number, max: number): { bg: string; color: string } {
  if (count <= 10) {
    return { bg: '#ffeb73', color: '#6f4b00' };
  } // gold
  if (count < max * 0.5) {
    return { bg: '#168b2c', color: '#fff' };
  } // good
  if (count < max * 0.83) {
    return { bg: '#6939b7', color: '#fff' };
  } // normal (purple)

  return { bg: '#9d3333', color: '#fff' }; // bad
}

/** 按年份分组五星列表 (旧→新) */
function groupByYear(list: GachaAnalysis['fiveStarList']): Record<string, GachaAnalysis['fiveStarList']> {
  // 反转为旧→新以匹配老版本时间线显示
  const reversed = [...list].reverse();
  const groups: Record<string, GachaAnalysis['fiveStarList']> = {};

  for (const item of reversed) {
    const year = item.time.slice(0, 4);

    if (!groups[year]) {
      groups[year] = [];
    }
    groups[year].push(item);
  }

  return groups;
}

export default function GachaDetailCard({ data }: { data: GachaDetailCardData }) {
  const { analysis, uid, game } = data;
  const max = game === 'gs' ? 90 : 80;
  const yearGroups = groupByYear(analysis.fiveStarList);

  return (
    <HTML style={{ width: '600px' }}>
      <div
        style={{
          fontFamily: FONT_FAMILY,
          color: '#fff',
          backgroundImage: `url(${elemBgUrl()})`,
          backgroundSize: 'cover',
          backgroundPosition: 'left top',
          position: 'relative',
          paddingBottom: '10px'
        }}
      >
        {/* 标题区 — 对齐老版 user-banner */}
        <div style={{ position: 'relative', padding: '20px 20px 10px' }}>
          <div style={{ fontFamily: FONT_NZBZ, fontSize: '36px' }}>#{analysis.gachaTypeName}</div>
          <div style={{ fontSize: '14px', opacity: 0.6, marginTop: '4px' }}>UID: {uid}</div>
        </div>

        {/* 统计栏 — 对齐老版 stat */}
        <div style={contStyle()}>
          <div style={{ padding: '10px 16px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <StatBox label='抽卡总数' value={String(analysis.totalCount)} />
            <StatBox label='金卡数' value={String(analysis.fiveStarCount)} />
            <StatBox label='紫卡数' value={String(analysis.fourStarCount)} />
            <StatBox label='已垫' value={String(analysis.pityCount)} />
            <StatBox label='平均出金' value={analysis.fiveStarAvg > 0 ? String(analysis.fiveStarAvg) : '-'} />
          </div>
        </div>

        {/* 提示 */}
        <div style={{ position: 'relative', padding: '6px 20px', fontSize: '12px', opacity: 0.5 }}>
          #抽卡帮助 获取抽卡链接，#更新抽卡记录 更新信息，#抽卡统计 可查看按卡池分析
        </div>

        {/* 五星时间线 — 对齐老版 gacha-list 按年份分组 */}
        {analysis.fiveStarList.length > 0 && (
          <div style={{ ...contStyle(), background: 'rgba(0,0,0,0.1)' }}>
            <div style={{ padding: '0' }}>
              {Object.entries(yearGroups).map(([year, items]) => (
                <div key={year}>
                  {/* 年份分隔线 */}
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', marginTop: '12px', padding: '4px 0' }}>
                    <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.5)' }} />
                    <span style={{ fontSize: '14px', opacity: 0.8, fontFamily: FONT_NZBZ }}>{year}</span>
                    <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.5)' }} />
                  </div>

                  {/* 每个五星记录 */}
                  {items.map((item, idx) => {
                    const dateStr = item.time.slice(5, 10); // MM-DD
                    const prevDate = idx > 0 ? items[idx - 1].time.slice(5, 10) : null;
                    const hasDate = idx === 0 || dateStr !== prevDate;
                    const bar = barClass(item.count, max);

                    return (
                      <div
                        key={idx}
                        style={{
                          height: '38px',
                          display: 'flex',
                          background: 'rgba(0,0,0,0.4)',
                          marginTop: hasDate ? '5px' : '0'
                        }}
                      >
                        {/* 日期列 */}
                        <div
                          style={{
                            width: '97px',
                            lineHeight: '38px',
                            paddingLeft: '8px',
                            background: 'rgba(0,0,0,0.8)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          {/* 圆点指示器 */}
                          <div
                            style={{
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              background: idx === 0 ? '#4caf50' : idx === items.length - 1 ? '#f44336' : '#fff',
                              opacity: 0.7,
                              flexShrink: 0
                            }}
                          />
                          <div style={{ textAlign: 'center', fontSize: '13px', opacity: hasDate ? 1 : 0 }}>{dateStr}</div>
                        </div>

                        {/* 角色名 */}
                        <div
                          style={{
                            width: '90px',
                            textAlign: 'right',
                            lineHeight: '38px',
                            paddingRight: '5px',
                            fontSize: '14px',
                            color: '#ffd484',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {item.name}
                        </div>

                        {/* 小图标 */}
                        <div style={{ width: '32px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <div
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '5px',
                              backgroundImage: `url(${URL_ITEM_BG5})`,
                              backgroundSize: '100% 100%',
                              backgroundRepeat: 'no-repeat',
                              overflow: 'hidden'
                            }}
                          >
                            {item.faceImg && <img src={item.faceImg} style={{ width: '32px', height: '32px', objectFit: 'cover' }} />}
                          </div>
                        </div>

                        {/* 进度条 */}
                        <div style={{ flex: 1, paddingRight: '15px', display: 'flex', alignItems: 'center' }}>
                          <div style={{ position: 'relative', width: `${(item.count / max) * 100}%`, minWidth: '18px' }}>
                            <div
                              style={{
                                height: '26px',
                                lineHeight: '26px',
                                borderRadius: '0 5px 5px 0',
                                background: bar.bg,
                                color: bar.color,
                                paddingLeft: '5px',
                                fontSize: '13px',
                                fontWeight: 'bold'
                              }}
                            >
                              {item.count}
                            </div>
                            {/* UP 标记 */}
                            <div
                              style={{
                                position: 'absolute',
                                right: '5px',
                                top: '4px',
                                width: '26px',
                                height: '18px',
                                lineHeight: '18px',
                                borderRadius: '15px',
                                textAlign: 'center',
                                fontSize: '12px',
                                fontWeight: 'bold',
                                background: '#ffeb73',
                                color: '#6f4b00',
                                boxShadow: '0 0 3px 0 #6f4b00'
                              }}
                            >
                              UP
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        )}

        {analysis.fiveStarList.length === 0 && (
          <div style={contStyle()}>
            <div style={{ padding: '24px', textAlign: 'center', opacity: 0.5, fontSize: '14px' }}>暂无五星记录</div>
          </div>
        )}

        <div style={{ position: 'relative', textAlign: 'center', padding: '12px 20px', fontSize: '16px', color: '#fff', textShadow: '1px 1px 1px #000' }}>
          Miao By ALemonJS
        </div>
      </div>
    </HTML>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        minWidth: '75px',
        textAlign: 'center',
        padding: '6px 10px',
        background: 'rgba(0,0,0,0.3)',
        borderRadius: '6px'
      }}
    >
      <div style={{ fontSize: '18px', fontWeight: 'bold', fontFamily: FONT_NZBZ }}>{value}</div>
      <div style={{ fontSize: '11px', opacity: 0.6, marginTop: '2px' }}>{label}</div>
    </div>
  );
}
