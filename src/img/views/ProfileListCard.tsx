/**
 * 650px 宽度 — 背景图 + card-bg 面板 + 圆形头像 + 星级边框 + 命座角标
 */
import type { ProfileData } from '@src/model/miao/enka.js';
import React from 'react';
import HTML from './HTML.js';
import { CONS_COLORS, CONS_SUFFIX, FONT_FAMILY, FONT_NZBZ, STAR_COLORS, contStyle, elemBgUrl } from './shared.js';

// ─── 单个角色项 ─────────────────────────────────────

function CharItem({ avatar, game }: { avatar: ProfileData['avatars'][0]; game: string }) {
  const border = STAR_COLORS[avatar.rarity] ?? STAR_COLORS[4];
  const consBg = CONS_COLORS[avatar.cons] ?? CONS_COLORS[0];
  const suffix = CONS_SUFFIX[game] ?? '命';

  return (
    <div
      style={{
        width: '75px',
        margin: '5px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative'
      }}
    >
      {/* 头像 — 64px 圆形 + 星级边框 */}
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          border: `2px solid ${border}`,
          boxShadow: '1px 1px 3px 0 #000',
          overflow: 'hidden',
          margin: '0 5px 0 6px'
        }}
      >
        <img src={avatar.icon} style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
      </div>
      {/* 名字 + 命座 */}
      <span
        style={{
          marginTop: '5px',
          display: 'block',
          fontSize: '14px',
          color: '#fff',
          textAlign: 'center',
          textShadow: '0 0 1px #000',
          whiteSpace: 'nowrap'
        }}
      >
        {avatar.abbr}
        <span
          style={{
            display: 'inline-block',
            verticalAlign: 'middle',
            padding: '1px 4px',
            borderRadius: '4px',
            fontSize: '12px',
            background: consBg,
            color: '#fff',
            margin: '-2px 0 0 1px',
            opacity: 0.9
          }}
        >
          {avatar.cons}
          {suffix}
        </span>
      </span>
    </div>
  );
}

interface Props {
  data: ProfileData & { game: string; servName?: string };
}

export default function ProfileListCard({ data }: Props) {
  const demo = data.avatars[0]?.abbr ?? '雷神';
  const bgUrl = elemBgUrl(data.avatars[0]?.element);

  return (
    <HTML style={{ width: '650px' }}>
      <div
        style={{
          width: '650px',
          fontFamily: FONT_FAMILY,
          fontSize: '18px',
          color: '#1e1f20',
          backgroundImage: `url(${bgUrl})`,
          backgroundSize: '100% auto',
          backgroundPosition: 'left top'
        }}
      >
        <div
          style={{
            width: '650px',
            padding: '20px 15px 10px 15px'
          }}
        >
          {/* head-box — NZBZ 标题 */}
          <div
            style={{
              borderRadius: '15px',
              padding: '10px 20px',
              color: '#fff',
              marginTop: '10px'
            }}
          >
            <div
              style={{
                fontFamily: FONT_NZBZ,
                fontSize: '36px',
                textShadow: '0 0 1px #000, 1px 1px 3px rgba(0,0,0,0.9)'
              }}
            >
              #面板列表
              <span
                style={{
                  display: 'inline-block',
                  marginLeft: '10px',
                  fontSize: '16px',
                  fontFamily: FONT_FAMILY,
                  textShadow: '0 0 1px #000, 1px 1px 3px rgba(0,0,0,0.9)'
                }}
              >
                UID:{data.uid}
              </span>
            </div>
            <div
              style={{
                fontSize: '16px',
                textShadow: '0 0 1px #000, 1px 1px 3px rgba(0,0,0,0.9)'
              }}
            >
              你可以使用<span style={{ color: '#d3bc8e', padding: '0 2px' }}>#{demo}面板</span>、
              <span style={{ color: '#d3bc8e', padding: '0 2px' }}>#{demo}伤害</span>、<span style={{ color: '#d3bc8e', padding: '0 2px' }}>#{demo}圣遗物</span>
              命令来查看面板信息了
            </div>
          </div>

          {/* .cont 面板 — card-bg 背景 */}
          <div style={contStyle()}>
            {/* 角色网格 */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                padding: '10px'
              }}
            >
              {data.avatars.length > 0 ? (
                data.avatars.map(av => <CharItem key={av.id} avatar={av} game={data.game} />)
              ) : (
                <div
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    padding: '40px 0',
                    color: '#888',
                    fontSize: '14px'
                  }}
                >
                  暂无面板数据，请在游戏中展示角色后重试
                </div>
              )}
            </div>

            {/* cont-footer */}
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
              <span style={{ width: '50%' }}>{data.updateTime ? `更新时间：${data.updateTime}` : ''}</span>
              <span style={{ width: '50%', textAlign: 'right' }}>当前更新服务：{data.servName ?? (data.game === 'sr' ? 'Mihomo' : 'Enka')}</span>
            </div>
          </div>

          {/* copyright */}
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
