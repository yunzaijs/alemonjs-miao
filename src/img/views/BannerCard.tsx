/**
 * 卡池/复刻统计卡片 — 对齐老版 banner-single 模板: 米色内容区 + 版本卡片
 */
import React from 'react';
import HTML from './HTML.js';
import { FONT_FAMILY, FONT_NZBZ, URL_BG01, URL_ITEM_BG4, URL_ITEM_BG5, URL_MAIN01, formatDateZh } from './shared.js';

// ─── 数据类型 ────────────────────────────────────────

export interface BannerRecord {
  version: string;
  phase: number; // 上半/下半 (1/2)
  name: string;
  element: string;
  rarity: number;
  faceImg?: string;
}

export interface BannerSingleData {
  mode: 'single';
  charName: string;
  element: string;
  rarity: number;
  faceImg?: string;
  records: { version: string; phase: number; daysSince: number }[];
}

export interface BannerAllData {
  mode: 'all';
  list: {
    name: string;
    element: string;
    rarity: number;
    faceImg?: string;
    upCount: number;
    lastVersion: string;
    daysSince: number;
  }[];
}

export type BannerCardData = BannerSingleData | BannerAllData;

// ─── 单角色 — 对齐老版 banner-single ─────────────────

function SingleBannerCard({ data }: { data: BannerSingleData }) {
  const daysDiff = data.records.length > 0 ? data.records[0].daysSince : 0;

  return (
    <HTML>
      <div
        style={{
          width: '600px',
          fontFamily: FONT_FAMILY,
          color: '#1e1f20',
          backgroundImage: `url(${URL_BG01})`,
          backgroundSize: 'cover',
          backgroundPosition: 'left center',
          backgroundColor: '#3b4251',
          position: 'relative',
          paddingBottom: '10px'
        }}
      >
        <img src={URL_MAIN01} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }} />

        {/* 标题 — 对齐老版 head-box */}
        <div style={{ position: 'relative', margin: '20px 0', padding: '0 20px', color: '#fff', textShadow: '0 0 1px #000, 1px 1px 3px rgba(0,0,0,0.9)' }}>
          <div style={{ fontFamily: FONT_NZBZ, fontSize: '36px' }}>#{data.charName}复刻统计</div>
          <div style={{ fontSize: '16px', marginTop: '4px' }}>
            共记复刻{data.records.length}次，{daysDiff > 0 ? `已${daysDiff}天未复刻` : '当前UP'}
          </div>
        </div>

        {/* 内容区 — 对齐老版 act-list 米色背景 */}
        <div
          style={{
            position: 'relative',
            width: '560px',
            margin: '0 auto',
            backgroundColor: '#f5eeea',
            padding: '20px 30px',
            borderRadius: '16px'
          }}
        >
          {data.records.length === 0 && <div style={{ textAlign: 'center', padding: '20px', opacity: 0.5, fontSize: '14px' }}>未找到卡池记录</div>}

          {data.records.map((r, i) => {
            const prevDaysSince = i < data.records.length - 1 ? data.records[i + 1].daysSince : 0;
            const diffDay = i < data.records.length - 1 ? r.daysSince - prevDaysSince : 0;

            return (
              <div key={i} style={{ borderRadius: '5px', backgroundColor: '#e7e2d6', padding: '10px', margin: '10px 0' }}>
                {/* 卡池信息 — 对齐老版 pool */}
                <div
                  style={{
                    width: '100%',
                    backgroundColor: '#c19f77',
                    backgroundImage: 'linear-gradient(to right, #c19f77 1%, #f2f0ea 1%)',
                    padding: '15px 20px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {/* 版本标签 — 对齐老版 #d27a7a */}
                    <span
                      style={{
                        backgroundColor: '#d27a7a',
                        color: '#fff',
                        fontWeight: 100,
                        fontSize: '12px',
                        padding: '4px 8px',
                        borderRadius: '5px'
                      }}
                    >
                      {r.version} {r.phase === 1 ? '上半' : '下半'}
                    </span>
                    <span style={{ fontSize: '14px' }}>{diffDay > 0 ? `距上次复刻${diffDay}天` : i === data.records.length - 1 ? '首次UP' : ''}</span>
                  </div>

                  {/* 角色头像 */}
                  {data.faceImg && (
                    <div style={{ marginTop: '10px', display: 'flex', gap: '5px' }}>
                      <div
                        style={{
                          width: '50px',
                          minHeight: '60px',
                          backgroundColor: '#e7e5d9',
                          fontSize: '10px',
                          textAlign: 'center',
                          borderRadius: '5px',
                          overflow: 'hidden'
                        }}
                      >
                        <div
                          style={{
                            width: '50px',
                            height: '50px',
                            backgroundImage: `url(${data.rarity === 5 ? URL_ITEM_BG5 : URL_ITEM_BG4})`,
                            backgroundSize: '100% 100%'
                          }}
                        >
                          <img src={data.faceImg} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                        </div>
                        <div style={{ padding: '3px 1px', fontSize: '10px' }}>{data.charName}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ position: 'relative', textAlign: 'center', padding: '12px 20px', fontSize: '16px', color: '#fff', textShadow: '1px 1px 1px #000' }}>
          Created by Miao-Plugin · {formatDateZh()}
        </div>
      </div>
    </HTML>
  );
}

// ─── 全角色复刻排行 — 使用方形角色卡 ──────────────────

function AllBannerCard({ data }: { data: BannerAllData }) {
  return (
    <HTML>
      <div
        style={{
          width: '600px',
          fontFamily: FONT_FAMILY,
          color: '#1e1f20',
          backgroundImage: `url(${URL_BG01})`,
          backgroundSize: 'cover',
          backgroundPosition: 'left center',
          backgroundColor: '#3b4251',
          position: 'relative',
          paddingBottom: '10px'
        }}
      >
        <img src={URL_MAIN01} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }} />

        {/* 标题 */}
        <div style={{ position: 'relative', margin: '20px 0', padding: '0 20px', color: '#fff', textShadow: '0 0 1px #000, 1px 1px 3px rgba(0,0,0,0.9)' }}>
          <div style={{ fontFamily: FONT_NZBZ, fontSize: '36px' }}>#五星角色复刻统计</div>
          <div style={{ fontSize: '16px', marginTop: '4px' }}>按最久未复刻排序 · 共 {data.list.length} 个角色</div>
        </div>

        {/* 内容区 — 米色背景 */}
        <div
          style={{
            position: 'relative',
            width: '560px',
            margin: '0 auto',
            backgroundColor: '#f5eeea',
            padding: '20px 30px',
            borderRadius: '16px'
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {data.list.map((c, i) => {
              const bgImg = c.rarity === 5 ? URL_ITEM_BG5 : URL_ITEM_BG4;
              const isLong = c.daysSince > 300;

              return (
                <div
                  key={i}
                  style={{
                    width: '90px',
                    backgroundColor: '#e7e5d9',
                    borderRadius: '5px',
                    overflow: 'hidden',
                    textAlign: 'center',
                    boxShadow: isLong ? '0 0 6px 0 #d27a7a' : '0 1px 3px rgba(0,0,0,0.15)'
                  }}
                >
                  {/* 头像 */}
                  <div
                    style={{
                      width: '90px',
                      height: '90px',
                      backgroundImage: `url(${bgImg})`,
                      backgroundSize: '100% 100%',
                      position: 'relative'
                    }}
                  >
                    {c.faceImg ? (
                      <img src={c.faceImg} style={{ width: '90px', height: '90px', objectFit: 'cover' }} />
                    ) : (
                      <div
                        style={{
                          width: '90px',
                          height: '90px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '28px',
                          color: '#999'
                        }}
                      >
                        ?
                      </div>
                    )}
                    {/* UP次数标签 */}
                    <div
                      style={{
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        borderRadius: '10px 0 0 0',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        padding: '2px 6px',
                        background: '#ffeb73',
                        color: '#6f4b00'
                      }}
                    >
                      {c.upCount}次
                    </div>
                  </div>
                  {/* 名称 */}
                  <div style={{ fontSize: '12px', lineHeight: '20px', fontWeight: 'bold' }}>{c.name}</div>
                  {/* 距今/版本 */}
                  <div style={{ fontSize: '10px', lineHeight: '16px', color: isLong ? '#d27a7a' : '#888', paddingBottom: '2px' }}>
                    {c.daysSince}天 · {c.lastVersion}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ position: 'relative', textAlign: 'center', padding: '12px 20px', fontSize: '16px', color: '#fff', textShadow: '1px 1px 1px #000' }}>
          Created by Miao-Plugin · {formatDateZh()}
        </div>
      </div>
    </HTML>
  );
}

// ─── 分发 ────────────────────────────────────────────

export default function BannerCard({ data }: { data: BannerCardData }) {
  if (data.mode === 'single') {
    return <SingleBannerCard data={data} />;
  }

  return <AllBannerCard data={data} />;
}
