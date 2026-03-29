/**
 * 角色持有率/命座分布卡片
 * 对齐老版 abyss-pct 模板: 方形星级卡片 + 持有率显示
 */
import React from 'react';
import HTML from './HTML.js';
import { CONS_COLORS, FONT_FAMILY, FONT_NZBZ, URL_BG01, URL_ITEM_BG4, URL_ITEM_BG5, URL_MAIN01, contStyle, contTitleStyle, formatDateZh } from './shared.js';

export interface AbyssStatItem {
  name: string;
  element: string;
  rarity: number;
  faceImg?: string;
  holdRate: number;
  avgCons: number;
  cons: number[]; // c0-c6 百分比
}

export interface AbyssStatCardData {
  title: string;
  version: string;
  update: string;
  list: AbyssStatItem[];
}

export default function AbyssStatCard({ data }: { data: AbyssStatCardData }) {
  const sorted = [...data.list].sort((a, b) => b.holdRate - a.holdRate);
  const fiveStars = sorted.filter(c => c.rarity === 5);
  const fourStars = sorted.filter(c => c.rarity === 4);

  return (
    <HTML>
      <div
        style={{
          width: '600px',
          fontFamily: FONT_FAMILY,
          color: '#1e1f20',
          backgroundImage: `url(${URL_BG01})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          paddingBottom: '10px'
        }}
      >
        <img src={URL_MAIN01} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }} />

        {/* 标题区 — 对齐老版 head-box */}
        <div
          style={{
            position: 'relative',
            borderRadius: '15px',
            padding: '10px 20px',
            color: '#fff',
            marginTop: '30px'
          }}
        >
          <div style={{ fontFamily: FONT_NZBZ, fontSize: '36px' }}>#{data.title || '角色持有率'}</div>
          <div style={{ fontSize: '16px' }}>角色持有率 & 平均命座统计</div>
        </div>

        {/* 信息区 */}
        <div style={contStyle()}>
          <div style={contTitleStyle()}>
            <span style={{ fontFamily: FONT_NZBZ, fontSize: '16px' }}>
              角色持有统计 {data.version && <span style={{ fontSize: '14px', opacity: 0.7 }}>v{data.version}</span>}
            </span>
          </div>
          <div style={{ padding: '10px 16px' }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13px', color: '#ddd' }}>
              <li style={{ marginBottom: '4px' }}>数据来源: 提瓦特小助手</li>
              {data.update && <li>更新时间: {data.update}</li>}
            </ul>
          </div>
        </div>

        {/* 五星角色 */}
        {fiveStars.length > 0 && <CharSection title='五星角色' chars={fiveStars} />}

        {/* 四星角色 */}
        {fourStars.length > 0 && <CharSection title='四星角色' chars={fourStars.slice(0, 40)} />}

        {sorted.length === 0 && (
          <div style={contStyle()}>
            <div style={{ padding: '24px', textAlign: 'center', opacity: 0.5, fontSize: '14px', color: '#fff' }}>暂无数据</div>
          </div>
        )}

        <div style={{ position: 'relative', textAlign: 'center', padding: '12px 20px', fontSize: '16px', color: '#fff', textShadow: '1px 1px 1px #000' }}>
          Created by Miao-Plugin · {formatDateZh()}
        </div>
      </div>
    </HTML>
  );
}

function CharSection({ title, chars }: { title: string; chars: AbyssStatItem[] }) {
  return (
    <div style={contStyle()}>
      <div style={contTitleStyle()}>
        <span style={{ fontFamily: FONT_NZBZ, fontSize: '16px' }}>{title}</span>
      </div>
      <div style={{ padding: '10px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {chars.map((c, i) => {
          const bgImg = c.rarity === 4 ? URL_ITEM_BG4 : URL_ITEM_BG5;
          const consColor = CONS_COLORS[Math.round(c.avgCons)] ?? '#888';

          return (
            <div
              key={i}
              style={{
                borderRadius: '7px',
                boxShadow: '0 2px 6px 0 rgba(132,93,90,0.3)',
                height: '100px',
                width: '70px',
                position: 'relative',
                overflow: 'hidden',
                background: '#e7e5d9'
              }}
            >
              {/* 角色头像 + 星级底图 */}
              <div
                style={{
                  width: '70px',
                  height: '70px',
                  backgroundImage: `url(${bgImg})`,
                  backgroundSize: '100%',
                  backgroundRepeat: 'no-repeat',
                  borderRadius: '7px 7px 20px 0',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                {c.faceImg ? (
                  <img src={c.faceImg} style={{ width: '70px', height: '70px', objectFit: 'cover' }} />
                ) : (
                  <div
                    style={{ width: '70px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', color: '#999' }}
                  >
                    ?
                  </div>
                )}
                {/* 右上角平均命座 */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    zIndex: 9,
                    fontSize: '12px',
                    textAlign: 'center',
                    color: '#fff',
                    padding: '1px 5px',
                    borderRadius: '4px',
                    background: consColor,
                    fontWeight: 'bold'
                  }}
                >
                  C{c.avgCons.toFixed(1)}
                </div>
              </div>

              {/* 持有率 */}
              <div
                style={{
                  position: 'absolute',
                  top: '70px',
                  left: 0,
                  width: '100%',
                  lineHeight: '15px',
                  fontSize: '13px',
                  textAlign: 'center',
                  color: '#333',
                  fontWeight: 'bold',
                  padding: '2px 0'
                }}
              >
                {c.holdRate.toFixed(1)}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
