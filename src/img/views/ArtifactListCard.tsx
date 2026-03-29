/**
 * 圣遗物列表卡片 — 显示所有角色的圣遗物评分汇总
 */
import { scoreCharacterArtifacts } from '@src/model/miao/artisMark.js';
import type { ProfileAvatar } from '@src/model/miao/enka.js';
import React from 'react';
import HTML from './HTML.js';
import { FONT_FAMILY, FONT_NZBZ, STAR_COLORS, URL_BG01, URL_MAIN01, contStyle, formatDateZh } from './shared.js';

// ─── 颜色常量 ────────────────────────────────────────

const POS_NAMES_GS = ['生之花', '死之羽', '时之沙', '空之杯', '理之冠'];
const POS_NAMES_SR = ['头部', '手部', '躯干', '脚部', '位面球', '连结绳'];

// ─── 角色圣遗物行 ───────────────────────────────────

interface CharRowProps {
  avatar: ProfileAvatar;
  game: string;
  score: ReturnType<typeof scoreCharacterArtifacts>;
}

function CharArtifactRow({ avatar, game, score }: CharRowProps) {
  const border = STAR_COLORS[avatar.rarity] ?? STAR_COLORS[4];
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
              borderRadius: '6px',
              padding: '5px 6px',
              minWidth: '44px',
              flex: 1
            }}
          >
            <span style={{ fontSize: '10px', color: '#888' }}>{posNames[i] ?? `#${art.pos}`}</span>
            <span
              style={{
                fontSize: '13px',
                fontWeight: 'bold',
                color: art.grade.color,
                marginTop: '2px'
              }}
            >
              {art.mark}
            </span>
            <span style={{ fontSize: '10px', color: art.grade.color }}>{art.grade.grade}</span>
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
        <span style={{ fontSize: '10px', color: '#888' }}>总分</span>
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

  // 预计算评分并排序（避免排序过程中重复计算）
  const scored = avatars
    .filter(av => av.artifacts && av.artifacts.length > 0)
    .map(av => ({ av, score: scoreCharacterArtifacts(av) }))
    .sort((a, b) => b.score.totalMark - a.score.totalMark);

  return (
    <HTML style={{ width: '700px' }}>
      <div
        style={{
          width: '700px',
          fontFamily: FONT_FAMILY,
          fontSize: '18px',
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
              {game === 'sr' ? '#遗器列表' : '#圣遗物列表'}
              <span
                style={{
                  display: 'inline-block',
                  marginLeft: '10px',
                  fontSize: '16px',
                  fontFamily: FONT_FAMILY,
                  textShadow: '0 0 1px #000, 1px 1px 3px rgba(0,0,0,0.9)'
                }}
              >
                UID:{uid}
              </span>
            </div>
            <div style={{ fontSize: '16px', textShadow: '0 0 1px #000, 1px 1px 3px rgba(0,0,0,0.9)' }}>
              共 {scored.length} 名角色，按{game === 'sr' ? '遗器' : '圣遗物'}评分排序
            </div>
          </div>

          {/* .cont 面板 */}
          <div style={contStyle()}>
            <div style={{ padding: '10px' }}>
              {scored.length > 0 ? (
                scored.map(({ av, score }) => <CharArtifactRow key={av.id} avatar={av} game={game} score={score} />)
              ) : (
                <div style={{ width: '100%', textAlign: 'center', padding: '40px 0', color: '#888', fontSize: '14px' }}>
                  暂无{game === 'sr' ? '遗器' : '圣遗物'}数据
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
                color: '#fff'
              }}
            >
              <span style={{ width: '50%' }}>数据来源: {game === 'sr' ? 'Mihomo' : 'Enka Network'}</span>
              <span style={{ width: '50%', textAlign: 'right' }}>{formatDateZh()}</span>
            </div>
          </div>

          <div style={{ fontSize: '14px', textAlign: 'center', color: '#fff', textShadow: '1px 1px 1px #000', margin: '10px 0' }}> AlemonJS</div>
        </div>
      </div>
    </HTML>
  );
}
