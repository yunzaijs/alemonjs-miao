/**
 * 圣遗物列表卡片 — 显示所有角色的圣遗物评分汇总
 */
import { scoreCharacterArtifacts } from '@src/model/miao/artisMark.js';
import type { ProfileAvatar } from '@src/model/miao/enka.js';
import React from 'react';
import HTML from './HTML.js';

// ─── 颜色常量 ────────────────────────────────────────

const STAR_BORDER: Record<number, string> = {
  5: '#ce8d54',
  4: '#a0a0e8',
  3: '#6ba8e8'
};

const POS_NAMES_GS = ['生之花', '死之羽', '时之沙', '空之杯', '理之冠'];
const POS_NAMES_SR = ['头部', '手部', '躯干', '脚部', '位面球', '连结绳'];

// ─── 角色圣遗物行 ───────────────────────────────────

interface CharRowProps {
  avatar: ProfileAvatar;
  game: string;
}

function CharArtifactRow({ avatar, game }: CharRowProps) {
  const score = scoreCharacterArtifacts(avatar);
  const border = STAR_BORDER[avatar.rarity] ?? STAR_BORDER[4];
  const posNames = game === 'sr' ? POS_NAMES_SR : POS_NAMES_GS;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '10px 14px',
        background: 'rgba(0,0,0,0.2)',
        borderRadius: '8px',
        marginBottom: '6px'
      }}
    >
      {/* 头像 */}
      <div
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          border: `2px solid ${border}`,
          overflow: 'hidden',
          flexShrink: 0
        }}
      >
        <img src={avatar.icon} style={{ width: '100%', height: '100%' }} />
      </div>

      {/* 角色信息 */}
      <div style={{ width: '60px', flexShrink: 0 }}>
        <div
          style={{
            fontSize: '13px',
            fontWeight: 'bold',
            color: '#fff',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {avatar.abbr || avatar.name}
        </div>
        <div style={{ fontSize: '11px', color: '#aaa', marginTop: '2px' }}>Lv.{avatar.level}</div>
      </div>

      {/* 各位置评分 */}
      <div style={{ display: 'flex', gap: '4px', flex: 1 }}>
        {score.artifacts.map((art, i) => (
          <div
            key={art.pos}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'rgba(0,0,0,0.25)',
              borderRadius: '4px',
              padding: '4px 6px',
              minWidth: '44px',
              flex: 1
            }}
          >
            <span style={{ fontSize: '9px', color: '#888' }}>{posNames[i] ?? `#${art.pos}`}</span>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 'bold',
                color: art.grade.color,
                marginTop: '1px'
              }}
            >
              {art.mark}
            </span>
            <span style={{ fontSize: '9px', color: art.grade.color }}>{art.grade.grade}</span>
          </div>
        ))}
      </div>

      {/* 总分 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flexShrink: 0,
          minWidth: '50px'
        }}
      >
        <span style={{ fontSize: '9px', color: '#888' }}>总分</span>
        <span
          style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: score.grade.color
          }}
        >
          {score.totalMark}
        </span>
        <span
          style={{
            fontSize: '11px',
            fontWeight: 'bold',
            color: score.grade.color
          }}
        >
          {score.grade.grade}
        </span>
      </div>
    </div>
  );
}

// ─── 主组件 ──────────────────────────────────────────

export interface ArtifactListData {
  game: string;
  uid: string;
  avatars: ProfileAvatar[];
}

interface Props {
  data: ArtifactListData;
}

export default function ArtifactListCard({ data }: Props) {
  const { avatars, game, uid } = data;

  // 按总评分排序（高分靠前）
  const sorted = [...avatars]
    .filter(av => av.artifacts && av.artifacts.length > 0)
    .sort((a, b) => {
      const sa = scoreCharacterArtifacts(a).totalMark;
      const sb = scoreCharacterArtifacts(b).totalMark;

      return sb - sa;
    });

  return (
    <HTML style={{ width: '700px' }}>
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
            borderBottom: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <div
            style={{
              fontSize: '22px',
              fontWeight: 'bold',
              color: '#fff',
              textShadow: '0 0 6px rgba(255,255,255,0.3)'
            }}
          >
            {game === 'sr' ? '#遗器列表' : '#圣遗物列表'}
            <span
              style={{
                fontSize: '13px',
                color: '#aaa',
                fontWeight: 'normal',
                marginLeft: '12px'
              }}
            >
              UID:{uid}
            </span>
          </div>
          <div
            style={{
              fontSize: '12px',
              color: '#999',
              marginTop: '6px'
            }}
          >
            共 {sorted.length} 名角色，按{game === 'sr' ? '遗器' : '圣遗物'}评分排序
          </div>
        </div>

        {/* 角色列表 */}
        <div style={{ padding: '14px 20px' }}>
          {sorted.length > 0 ? (
            sorted.map(av => <CharArtifactRow key={av.id} avatar={av} game={game} />)
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
              暂无{game === 'sr' ? '遗器' : '圣遗物'}数据
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
          <span>{new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}</span>
        </div>
      </div>
    </HTML>
  );
}
