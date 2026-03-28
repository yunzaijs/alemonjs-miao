/**
 * 650px 宽度，紧凑角色网格，圆形头像 + 星级边框 + 命座角标
 */
import type { ProfileData } from '@src/model/miao/enka.js';
import React from 'react';
import HTML from './HTML.js';

// ─── 颜色常量 (原版 CSS) ────────────────────────────

const STAR_BORDER: Record<number, string> = {
  5: '#ce8d54',
  4: '#a0a0e8',
  3: '#6ba8e8'
};

const CONS_BG: Record<number, string> = {
  0: '#8e8e8e',
  1: '#5d9e5e',
  2: '#5c85c1',
  3: '#7267b0',
  4: '#a85fa5',
  5: '#c2733a',
  6: '#d4a574'
};

// ─── 单个角色项 ─────────────────────────────────────

function CharItem({ avatar }: { avatar: ProfileData['avatars'][0] }) {
  const border = STAR_BORDER[avatar.rarity] ?? STAR_BORDER[4];
  const consBg = CONS_BG[avatar.cons] ?? CONS_BG[0];

  return (
    <div
      style={{
        width: '75px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '5px 0'
      }}
    >
      {/* 头像 */}
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          border: `2px solid ${border}`,
          boxShadow: '1px 1px 3px 0 rgba(0,0,0,0.5)',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <img src={avatar.icon} style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
      </div>
      {/* 名字 + 命座 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2px',
          marginTop: '4px',
          width: '100%'
        }}
      >
        <span
          style={{
            fontSize: '12px',
            color: '#fff',
            textShadow: '0 0 3px #000, 1px 1px 2px rgba(0,0,0,0.8)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: '55px'
          }}
        >
          {avatar.abbr}
        </span>
        <span
          style={{
            fontSize: '10px',
            background: consBg,
            color: '#fff',
            borderRadius: '3px',
            padding: '0 3px',
            lineHeight: '14px',
            flexShrink: 0
          }}
        >
          {avatar.cons}
        </span>
      </div>
    </div>
  );
}

interface Props {
  data: ProfileData & { game: string; servName?: string };
}

export default function ProfileListCard({ data }: Props) {
  const demo = data.avatars[0]?.abbr ?? '雷神';

  return (
    <HTML style={{ width: '650px' }}>
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
            #面板列表
            <span
              style={{
                fontSize: '13px',
                color: '#aaa',
                fontWeight: 'normal',
                marginLeft: '12px'
              }}
            >
              UID:{data.uid}
            </span>
          </div>
          <div
            style={{
              fontSize: '12px',
              color: '#999',
              marginTop: '6px',
              lineHeight: '1.6'
            }}
          >
            你可以使用 <span style={{ color: '#e8d5b0' }}>#{demo}面板</span>、<span style={{ color: '#e8d5b0' }}>#{demo}伤害</span>、
            <span style={{ color: '#e8d5b0' }}>#{demo}圣遗物</span> 命令来查看面板信息了
          </div>
        </div>

        {/* 角色网格 */}
        <div
          style={{
            padding: '14px 20px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start'
          }}
        >
          {data.avatars.length > 0 ? (
            data.avatars.map(av => <CharItem key={av.id} avatar={av} />)
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
              暂无面板数据，请在游戏中展示角色后重试
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
            alignItems: 'center',
            fontSize: '11px',
            color: '#777'
          }}
        >
          <span>更新时间：{data.updateTime}</span>
          <span>当前更新服务：{data.servName ?? (data.game === 'sr' ? 'Mihomo' : 'Enka')}</span>
        </div>
      </div>
    </HTML>
  );
}
