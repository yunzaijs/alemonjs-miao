/**
 * 深渊出场率/使用率卡片 — 按 S+/S/A/B/C 等级分区展示
 * 对齐老版 abyss-pct 模板: 左侧渐变色条 + 右侧方形星级角色卡片
 */
import React from 'react';
import HTML from './HTML.js';
import { FONT_FAMILY, FONT_NZBZ, URL_ITEM_BG4, URL_ITEM_BG5, contStyle, contTitleStyle } from './shared.js';

export interface AbyssUsageItem {
  name: string;
  element: string;
  rarity: number;
  faceImg?: string;
  useRate: number;
  rankClass: string; // "s1" | "s" | "a" | "b" | "f"
}

export interface AbyssUsageCardData {
  title: string;
  version: string;
  update: string;
  list: AbyssUsageItem[];
}

/** 老版等级渐变色 (左10%色条 → 右侧暗色) */
const RANK_GRADIENT: Record<string, string> = {
  s1: 'linear-gradient(to right, #03ec0ee0 10%, rgba(0,0,0,0.5) 10%)',
  s: 'linear-gradient(to right, #bfff7fe0 10%, rgba(0,0,0,0.5) 10%)',
  a: 'linear-gradient(to right, #ffff7fe0 10%, rgba(0,0,0,0.5) 10%)',
  b: 'linear-gradient(to right, #ffdf7fe0 10%, rgba(0,0,0,0.5) 10%)',
  f: 'linear-gradient(to right, #fc4a4ae0 10%, rgba(0,0,0,0.5) 10%)'
};

const RANK_LABELS: Record<string, string> = {
  s1: 'S+',
  s: 'S',
  a: 'A',
  b: 'B',
  f: 'C'
};

const RANK_ORDER = ['s1', 's', 'a', 'b', 'f'];

export default function AbyssUsageCard({ data }: { data: AbyssUsageCardData }) {
  const groups = new Map<string, AbyssUsageItem[]>();

  for (const rank of RANK_ORDER) {
    groups.set(rank, []);
  }

  for (const item of data.list) {
    const arr = groups.get(item.rankClass);

    if (arr) {
      arr.push(item);
    } else {
      groups.get('f')?.push(item);
    }
  }

  for (const arr of groups.values()) {
    arr.sort((a, b) => b.useRate - a.useRate);
  }

  const modeName = data.title?.includes('幽境') ? '幽境危战' : '深渊';

  return (
    <HTML style={{ width: '600px' }}>
      <div
        style={{
          fontFamily: FONT_FAMILY,
          color: '#fff',
          background: '#2a3860',
          position: 'relative',
          paddingBottom: '10px'
        }}
      >
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
          <div style={{ fontFamily: FONT_NZBZ, fontSize: '36px' }}>#{modeName}使用率</div>
          <div style={{ fontSize: '16px' }}>【#{modeName}出场率】出场总数/总记录数</div>
          <div style={{ fontSize: '16px' }}>【#{modeName}使用率】出场总数/持有该角色的记录数</div>
        </div>

        {/* 统计信息区 */}
        <div style={contStyle()}>
          <div style={contTitleStyle()}>
            <span style={{ fontFamily: FONT_NZBZ, fontSize: '16px' }}>
              {modeName}使用率统计 {data.version && <span style={{ fontSize: '14px', opacity: 0.7 }}>v{data.version}</span>}
            </span>
          </div>
          <div style={{ padding: '10px 10px 10px 0' }}>
            <ul style={{ listStyle: 'none', padding: '0 16px', margin: 0, fontSize: '13px', color: '#ddd' }}>
              <li style={{ marginBottom: '4px' }}>数据来源: 提瓦特小助手</li>
              {data.update && <li>更新时间: {data.update}</li>}
            </ul>
          </div>
        </div>

        {/* 各等级区 — 对齐老版 info_box_border 布局 */}
        {RANK_ORDER.map(rank => {
          const items = groups.get(rank);

          if (!items || items.length === 0) {
            return null;
          }

          return (
            <div
              key={rank}
              style={{
                display: 'flex',
                alignItems: 'center',
                margin: '10px 10px 10px 10px',
                padding: '12px 0',
                borderRadius: '0 10px 10px 0',
                backgroundImage: RANK_GRADIENT[rank] ?? RANK_GRADIENT.f,
                position: 'relative'
              }}
            >
              {/* 左侧等级标签 */}
              <div
                style={{
                  display: 'flex',
                  width: '10%',
                  color: '#fff',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  fontFamily: FONT_NZBZ
                }}
              >
                {RANK_LABELS[rank] ?? rank}
              </div>

              {/* 右侧角色卡片列表 */}
              <div
                style={{
                  width: '90%',
                  display: 'flex',
                  gap: '10px',
                  marginLeft: '0',
                  flexWrap: 'wrap',
                  padding: '0 10px'
                }}
              >
                {items.map((c, i) => {
                  const bgImg = c.rarity === 4 ? URL_ITEM_BG4 : URL_ITEM_BG5;

                  return (
                    <div
                      key={i}
                      style={{
                        borderRadius: '7px',
                        boxShadow: '0 2px 6px 0 rgba(132,93,90,0.3)',
                        height: '88px',
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
                          overflow: 'hidden'
                        }}
                      >
                        {c.faceImg ? (
                          <img
                            src={c.faceImg}
                            style={{
                              width: '70px',
                              height: '70px',
                              objectFit: 'cover'
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              width: '70px',
                              height: '70px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '24px',
                              color: '#999'
                            }}
                          >
                            ?
                          </div>
                        )}
                      </div>

                      {/* 使用率百分比 */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '70px',
                          left: 0,
                          width: '100%',
                          height: '18px',
                          lineHeight: '18px',
                          fontSize: '14px',
                          textAlign: 'center',
                          color: '#333',
                          fontWeight: 'bold'
                        }}
                      >
                        {c.useRate.toFixed(1)}%
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {data.list.length === 0 && (
          <div style={contStyle()}>
            <div style={{ padding: '24px', textAlign: 'center', opacity: 0.5, fontSize: '14px', color: '#fff' }}>暂无数据</div>
          </div>
        )}

        <div style={{ position: 'relative', textAlign: 'center', padding: '12px 20px', fontSize: '16px', color: '#fff', textShadow: '1px 1px 1px #000' }}>
          Miao By ALemonJS
        </div>
      </div>
    </HTML>
  );
}
