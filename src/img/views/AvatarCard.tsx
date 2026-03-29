/**
 * 角色卡片 — 展示单个 / 多个角色信息
 * - 单角色模式（老婆 / 戳一戳）: 大图展示角色面板
 * - 列表模式（#角色卡片）: 网格展示所有角色
 */
import React from 'react';
import HTML from './HTML.js';
import { CONS_COLORS, FONT_FAMILY, FONT_NZBZ, RARITY_COLORS, contStyle, contTitleStyle, elemBgUrl } from './shared.js';

// ─── 数据类型 ────────────────────────────────────────

export interface AvatarWeapon {
  id: number;
  name: string;
  type: number;
  rarity: number;
  level: number;
  affix_level: number;
  icon: string;
}

export interface AvatarInfo {
  id: number;
  name: string;
  element: string;
  fetter: number;
  level: number;
  rarity: number;
  actived_constellation_num: number;
  weapon: AvatarWeapon;
  icon: string;
  image: string;
  side_icon?: string;
}

export interface AvatarCardData {
  uid: string;
  game: string;
  /** 标题 (如 "老婆", "老公", "角色卡片") */
  title: string;
  /** 关系称呼 (如 "老婆", "老公") 仅单角色模式 */
  relation?: string;
  /** 单角色模式 */
  avatar?: AvatarInfo;
  /** 列表模式 */
  avatars?: AvatarInfo[];
}

// ─── 单角色大卡 ──────────────────────────────────────

function SingleAvatarCard({ avatar, relation, uid }: { avatar: AvatarInfo; relation?: string; uid: string }) {
  const cons = avatar.actived_constellation_num;
  const consColor = CONS_COLORS[cons] ?? CONS_COLORS[0];
  const weapon = avatar.weapon;

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* 全身像背景 */}
      <img src={avatar.image || avatar.icon} style={{ width: '100%', display: 'block', marginBottom: '-1px' }} />

      {/* char-title 叠加在左上角 */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          padding: '5px 10px',
          textShadow: '0 0 3px #000, 3px 3px 5px #000'
        }}
      >
        <div style={{ paddingLeft: '10px', display: 'inline-block', whiteSpace: 'nowrap', position: 'relative' }}>
          <strong style={{ fontFamily: FONT_NZBZ, fontSize: '60px', letterSpacing: '5px', fontWeight: 'normal' }}>{avatar.name}</strong>
          {relation && <span style={{ fontSize: '20px', color: '#ff8a80', marginLeft: '10px' }}>♥ {relation}</span>}
          <span
            style={{
              fontSize: '20px',
              padding: '3px 8px',
              borderRadius: '8px',
              margin: '10px 0',
              textShadow: '0 0 1px #000',
              background: consColor,
              color: '#fff',
              verticalAlign: 'bottom'
            }}
          >
            {cons}命
          </span>
        </div>
        <div style={{ fontSize: '20px', height: '25px', lineHeight: '25px', paddingLeft: '10px' }}>
          <span>Uid:{uid}</span>
          {avatar.level > 0 && <span style={{ marginLeft: '10px' }}>Lv.{avatar.level}</span>}
        </div>
      </div>

      {/* char-detail 底部信息栏 */}
      <div
        style={{
          position: 'absolute',
          bottom: '25px',
          left: 0,
          right: 0,
          display: 'flex',
          padding: '4px'
        }}
      >
        {/* 武器 */}
        {weapon && (
          <div
            style={{
              width: '200px',
              height: '90px',
              margin: '4px',
              position: 'relative',
              textShadow: '1px 1px 1px #000',
              background: 'rgba(0,0,0,0.4)',
              borderRadius: '8px',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              padding: '5px'
            }}
          >
            <div style={{ width: '80px', height: '80px', flexShrink: 0 }}>
              <img src={weapon.icon} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <div style={{ paddingLeft: '5px' }}>
              <strong style={{ fontSize: '18px', display: 'block' }}>{weapon.name}</strong>
              <div style={{ fontSize: '14px', color: RARITY_COLORS[weapon.rarity] ?? '#ccc' }}>{'★'.repeat(weapon.rarity)}</div>
              <div style={{ fontSize: '14px' }}>
                Lv.{weapon.level}{' '}
                <span
                  style={{
                    fontSize: '13px',
                    background: weapon.affix_level >= 4 ? '#ff5722' : '#62a8ea',
                    color: '#fff',
                    padding: '1px 4px',
                    borderRadius: '3px'
                  }}
                >
                  精{weapon.affix_level}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* copyright */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '25px',
          lineHeight: '25px',
          padding: '0 10px',
          background: 'rgba(0,0,0,0.5)',
          textAlign: 'right',
          fontSize: '12px'
        }}
      >
        AlemonJS · Miao By ALemonJS
      </div>
    </div>
  );
}

// ─── 多角色网格 ──────────────────────────────────────

function AvatarGrid({ avatars }: { avatars: AvatarInfo[] }) {
  // 按等级降序，同级按星级降序
  const sorted = [...avatars].sort((a, b) => {
    if (b.level !== a.level) {
      return b.level - a.level;
    }
    if (b.rarity !== a.rarity) {
      return b.rarity - a.rarity;
    }

    return b.actived_constellation_num - a.actived_constellation_num;
  });

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '6px',
        padding: '10px 12px'
      }}
    >
      {sorted.map(av => {
        const cons = av.actived_constellation_num;
        const consColor = CONS_COLORS[cons] ?? CONS_COLORS[0];
        const color = RARITY_COLORS[av.rarity] ?? '#ccc';

        return (
          <div
            key={av.id}
            style={{
              width: '68px',
              textAlign: 'center',
              background: 'rgba(0,0,0,0.25)',
              borderRadius: '8px',
              overflow: 'hidden',
              paddingBottom: '4px'
            }}
          >
            <div
              style={{
                width: '68px',
                height: '68px',
                position: 'relative',
                border: `2px solid ${color}`,
                borderRadius: '8px 8px 0 0',
                overflow: 'hidden',
                background: 'rgba(0,0,0,0.3)'
              }}
            >
              <img src={av.icon} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              {/* 命座标记 */}
              <span
                style={{
                  position: 'absolute',
                  bottom: '0',
                  right: '0',
                  fontSize: '10px',
                  background: consColor,
                  color: '#fff',
                  padding: '0 4px',
                  borderRadius: '6px 0 0 0'
                }}
              >
                {cons}命
              </span>
            </div>
            <div
              style={{
                fontSize: '11px',
                marginTop: '2px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {av.name}
            </div>
            <div style={{ fontSize: '10px', opacity: 0.6 }}>Lv.{av.level}</div>
          </div>
        );
      })}
    </div>
  );
}

// ─── 主组件 ──────────────────────────────────────────

export default function AvatarCard({ data }: { data: AvatarCardData }) {
  const isSingle = !!data.avatar;
  const avatarCount = data.avatars?.length ?? (data.avatar ? 1 : 0);

  /* 单角色模式：老 character-card 风格，全身像做背景 */
  if (isSingle && data.avatar) {
    return (
      <HTML style={{ width: '600px' }}>
        <div
          style={{
            fontFamily: FONT_FAMILY,
            color: '#fff',
            backgroundColor: '#1234'
          }}
        >
          <SingleAvatarCard avatar={data.avatar} relation={data.relation} uid={data.uid} />
        </div>
      </HTML>
    );
  }

  /* 多角色列表模式 */
  return (
    <HTML style={{ width: '600px' }}>
      <div
        style={{
          fontFamily: FONT_FAMILY,
          color: '#fff',
          backgroundImage: `url(${elemBgUrl(data.avatars?.[0]?.element)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'left top',
          position: 'relative',
          paddingBottom: '10px'
        }}
      >
        {/* 标题栏 */}
        <div
          style={{
            position: 'relative',
            padding: '20px 20px 10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end'
          }}
        >
          <div>
            <div style={{ fontFamily: FONT_NZBZ, fontSize: '28px', color: '#d3bc8e' }}>#{data.title}</div>
            <div style={{ fontSize: '13px', opacity: 0.6, marginTop: '4px' }}>共 {avatarCount} 个角色</div>
          </div>
          <div style={{ fontSize: '13px', opacity: 0.5 }}>UID:{data.uid}</div>
        </div>

        {/* 主内容 */}
        <div style={{ position: 'relative' }}>
          {data.avatars && data.avatars.length > 0 ? (
            <div style={contStyle()}>
              <div style={contTitleStyle()}>
                <span style={{ fontFamily: FONT_NZBZ, fontSize: '18px' }}>角色一览</span>
              </div>
              <AvatarGrid avatars={data.avatars} />
            </div>
          ) : (
            <div
              style={{
                ...contStyle(),
                padding: '20px',
                textAlign: 'center',
                opacity: 0.6
              }}
            >
              暂无角色数据
            </div>
          )}
        </div>

        {/* 底栏 */}
        <div
          style={{
            position: 'relative',
            textAlign: 'right',
            padding: '8px 20px',
            fontSize: '12px',
            opacity: 0.4
          }}
        >
          Miao By ALemonJS
        </div>
      </div>
    </HTML>
  );
}
