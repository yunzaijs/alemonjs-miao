/**
 * 群内排行榜卡片 — 显示某个角色在群内的排名列表
 */
import type { ArtisGradeInfo } from '@src/model/miao/artisMark.js';
import { getGrade } from '@src/model/miao/artisMark.js';
import type { RankEntry } from '@src/model/miao/profileRank.js';
import React from 'react';
import HTML from './HTML.js';
import { DARK_BG, ELEMENT_COLORS, FONT_FAMILY, formatDateZh } from './shared.js';

// ─── 颜色常量 ────────────────────────────────────────

const RANK_MEDAL: Record<number, string> = {
  1: '#ffd700',
  2: '#c0c0c0',
  3: '#cd7f32'
};

// ─── 排名行 ─────────────────────────────────────────

function RankRow({ entry, idx, type }: { entry: RankEntry; idx: number; type: string }) {
  const medalColor = RANK_MEDAL[entry.rank];
  const bgColor = medalColor ? `linear-gradient(90deg, ${medalColor}18, transparent)` : idx % 2 === 0 ? 'rgba(0,0,0,0.2)' : 'rgba(50,50,50,0.4)';

  let gradeInfo: ArtisGradeInfo | null = null;

  if (type === 'mark') {
    gradeInfo = getGrade(entry.score / 5); // 单件平均
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '8px 14px',
        background: bgColor,
        borderRadius: '4px',
        marginBottom: '2px',
        gap: '12px'
      }}
    >
      {/* 排名 */}
      <div
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: medalColor ?? 'rgba(100,100,100,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: medalColor ? '16px' : '14px',
          fontWeight: 'bold',
          color: medalColor ? '#fff' : '#aaa',
          flexShrink: 0
        }}
      >
        {entry.rank}
      </div>

      {/* UID */}
      <span
        style={{
          fontSize: '13px',
          color: '#ccc',
          width: '120px',
          flexShrink: 0
        }}
      >
        UID: {entry.uid}
      </span>

      {/* 分数 */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px' }}>
        <span
          style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: entry.rank <= 3 ? (RANK_MEDAL[entry.rank] ?? '#fff') : '#fff'
          }}
        >
          {entry.score}
        </span>
        {type === 'mark' && <span style={{ fontSize: '12px', color: '#aaa' }}>分</span>}
        {type === 'crit' && <span style={{ fontSize: '12px', color: '#aaa' }}>%</span>}
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
    <HTML style={{ width: '550px' }}>
      <div
        style={{
          padding: '0',
          background: DARK_BG,
          fontFamily: FONT_FAMILY,
          fontSize: '14px',
          color: '#eee',
          minHeight: '300px'
        }}
      >
        {/* 头部 */}
        <div
          style={{
            padding: '20px 24px 14px',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <span
              style={{
                fontSize: '22px',
                fontWeight: 'bold',
                color: '#fff',
                textShadow: '0 0 6px rgba(255,255,255,0.3)'
              }}
            >
              {charName}
            </span>
            {charElement && (
              <span
                style={{
                  fontSize: '11px',
                  background: elemColor,
                  color: '#fff',
                  borderRadius: '4px',
                  padding: '2px 8px',
                  fontWeight: 'bold'
                }}
              >
                {charElement}
              </span>
            )}
            <span
              style={{
                fontSize: '13px',
                color: '#aaa',
                marginLeft: 'auto'
              }}
            >
              {typeLabel}排行
            </span>
          </div>
          <div
            style={{
              fontSize: '12px',
              color: '#999',
              marginTop: '6px'
            }}
          >
            群内排名 · 共 {entries.length} 人参与
          </div>
        </div>

        {/* 排名列表 */}
        <div style={{ padding: '14px 20px' }}>
          {entries.length > 0 ? (
            entries.map((entry, idx) => <RankRow key={entry.uid} entry={entry} idx={idx} type={type} />)
          ) : (
            <div
              style={{
                width: '100%',
                textAlign: 'center',
                padding: '40px 0',
                color: '#666',
                fontSize: '14px'
              }}
            >
              暂无排名数据，请先使用 #更新面板 提交数据
            </div>
          )}
        </div>

        {/* 底部 */}
        <div
          style={{
            padding: '10px 24px 16px',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '11px',
            color: '#666'
          }}
        >
          <span>数据来源: {game === 'sr' ? 'Mihomo' : 'Enka Network'}</span>
          <span>{formatDateZh()}</span>
        </div>
      </div>
    </HTML>
  );
}
