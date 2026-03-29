/**
 * 群内排行榜卡片 — 显示某个角色在群内的排名列表
 */
import type { ArtisGradeInfo } from '@src/model/miao/artisMark.js';
import { getGrade } from '@src/model/miao/artisMark.js';
import type { RankEntry } from '@src/model/miao/profileRank.js';
import React from 'react';
import HTML from './HTML.js';
import { ELEMENT_COLORS, FONT_FAMILY, FONT_NZBZ, URL_BG01, URL_MAIN01, contStyle, contTitleStyle, formatDateZh, rankIconStyle } from './shared.js';

// ─── 颜色常量 ────────────────────────────────────────

const RANK_MEDAL: Record<number, string> = {
  1: '#ffd700',
  2: '#c0c0c0',
  3: '#cd7f32'
};

// ─── 排名行 ─────────────────────────────────────────

function RankRow({ entry, idx, type }: { entry: RankEntry; idx: number; type: string }) {
  const medalColor = RANK_MEDAL[entry.rank];
  const bgColor = idx % 2 === 0 ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.2)';

  let gradeInfo: ArtisGradeInfo | null = null;

  if (type === 'mark') {
    gradeInfo = getGrade(entry.score / 5);
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '6px 14px',
        background: bgColor,
        gap: '10px'
      }}
    >
      {/* 排名徽章 */}
      <div
        style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          background: medalColor ?? 'rgba(100,100,100,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: medalColor ? '14px' : '13px',
          fontWeight: 'bold',
          color: '#fff',
          flexShrink: 0
        }}
      >
        {entry.rank}
      </div>

      {/* UID */}
      <span style={{ fontSize: '13px', color: '#fff', width: '110px', flexShrink: 0 }}>UID: {entry.uid}</span>

      {/* 分数 */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '6px' }}>
        <div style={rankIconStyle(type === 'mark' ? 'mark' : 'dmg')} />
        <span
          style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: entry.rank <= 3 ? (RANK_MEDAL[entry.rank] ?? '#fff') : '#fff'
          }}
        >
          {entry.score}
        </span>
        {type === 'mark' && <span style={{ fontSize: '12px', color: '#d3bc8e' }}>分</span>}
        {type === 'crit' && <span style={{ fontSize: '12px', color: '#d3bc8e' }}>%</span>}
        {gradeInfo && (
          <span
            style={{
              fontSize: '12px',
              fontWeight: 'bold',
              color: gradeInfo.color,
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '3px',
              padding: '1px 6px'
            }}
          >
            {gradeInfo.grade}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── 主组件 ──────────────────────────────────────────

export interface RankListData {
  game: string;
  charName: string;
  charElement?: string;
  type: string; // 'mark' | 'crit'
  entries: RankEntry[];
}

interface Props {
  data: RankListData;
}

const TYPE_LABELS: Record<string, string> = {
  mark: '圣遗物评分',
  crit: '双爆排名'
};

export default function RankListCard({ data }: Props) {
  const { charName, charElement, type, entries, game } = data;
  const typeLabel = TYPE_LABELS[type] ?? type;
  const elemColor = charElement ? (ELEMENT_COLORS[charElement] ?? '#888') : '#e8d5b0';

  return (
    <HTML style={{ width: '600px' }}>
      <div
        style={{
          width: '600px',
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
            width: '600px',
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
                textShadow: '0 0 1px #000, 1px 1px 3px rgba(0,0,0,0.9)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              {charName}
              {charElement && (
                <span
                  style={{
                    fontSize: '14px',
                    background: elemColor,
                    color: '#fff',
                    borderRadius: '4px',
                    padding: '2px 8px',
                    fontFamily: FONT_FAMILY
                  }}
                >
                  {charElement}
                </span>
              )}
            </div>
            <div style={{ fontSize: '14px', textShadow: '0 0 1px #000, 1px 1px 3px rgba(0,0,0,0.9)' }}>
              {typeLabel}排行 · 共 {entries.length} 人参与
            </div>
          </div>

          {/* 排名列表 */}
          <div style={contStyle()}>
            <div style={contTitleStyle()}>群内排名</div>
            {entries.length > 0 ? (
              entries.map((entry, idx) => <RankRow key={entry.uid} entry={entry} idx={idx} type={type} />)
            ) : (
              <div style={{ width: '100%', textAlign: 'center', padding: '40px 0', color: '#fff', fontSize: '14px' }}>
                暂无排名数据，请先使用 #更新面板 提交数据
              </div>
            )}
          </div>

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
            <span style={{ width: '50%' }}>数据来源: {game === 'sr' ? 'Mihomo' : 'Enka Network'}</span>
            <span style={{ width: '50%', textAlign: 'right' }}>{formatDateZh()}</span>
          </div>

          <div style={{ fontSize: '14px', textAlign: 'center', color: '#fff', textShadow: '1px 1px 1px #000', margin: '10px 0' }}> AlemonJS</div>
        </div>
      </div>
    </HTML>
  );
}
