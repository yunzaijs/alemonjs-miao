/**
 * 抽卡统计卡片 — 对齐老版 gacha-stat 模板: 卡池分组 + 方形角色卡
 */
import type { GachaAnalysis } from '@src/model/miao/gachaLog.js';
import React from 'react';
import HTML from './HTML.js';
import { FONT_FAMILY, FONT_NZBZ, URL_ITEM_BG4, URL_ITEM_BG5, contStyle, elemBgUrl } from './shared.js';

export interface GachaStatCardData {
  uid: string;
  game: string;
  analyses: GachaAnalysis[];
  totalCount: number;
  totalFive: number;
  totalFour: number;
}

export default function GachaStatCard({ data }: { data: GachaStatCardData }) {
  const { uid, analyses, totalCount, totalFive, totalFour } = data;

  return (
    <HTML style={{ width: '600px' }}>
      <div
        style={{
          fontFamily: FONT_FAMILY,
          color: '#fff',
          backgroundImage: `url(${elemBgUrl()})`,
          backgroundSize: 'cover',
          backgroundPosition: 'left top',
          position: 'relative',
          paddingBottom: '10px'
        }}
      >
        {/* 标题区 — 对齐老版 user-banner */}
        <div style={{ position: 'relative', padding: '20px 20px 10px' }}>
          <div style={{ fontFamily: FONT_NZBZ, fontSize: '36px' }}>#抽卡统计</div>
          <div style={{ fontSize: '14px', opacity: 0.6, marginTop: '4px' }}>UID: {uid}</div>
        </div>

        {/* 总览统计 — 对齐老版 stat 栏 */}
        <div style={contStyle()}>
          <div style={{ padding: '10px 16px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <StatLi label='抽卡总数' value={totalCount} />
            <StatLi label='金卡' value={totalFive} />
            <StatLi label='紫卡' value={totalFour} />
            <StatLi label='蓝卡' value={totalCount - totalFive - totalFour} />
          </div>
        </div>

        {/* 帮助提示 */}
        <div style={{ position: 'relative', padding: '6px 20px', fontSize: '12px', opacity: 0.5 }}>
          #角色统计/#武器统计 角色/武器池统计，#常驻统计 常驻池统计，#抽卡帮助 获取帮助
        </div>

        {/* 每个卡池 — 对齐老版 versionData 分组 */}
        {analyses.map((a, idx) => (
          <PoolSection key={idx} analysis={a} game={data.game} />
        ))}

        {analyses.length === 0 && (
          <div style={contStyle()}>
            <div style={{ padding: '24px', textAlign: 'center', opacity: 0.5, fontSize: '14px' }}>暂无抽卡记录</div>
          </div>
        )}

        <div style={{ position: 'relative', textAlign: 'center', padding: '12px 20px', fontSize: '16px', color: '#fff', textShadow: '1px 1px 1px #000' }}>
          Miao By ALemonJS
        </div>
      </div>
    </HTML>
  );
}

function PoolSection({ analysis, game }: { analysis: GachaAnalysis; game: string }) {
  const cardWidth = game === 'gs' ? 69 : 90;

  return (
    <div style={{ ...contStyle(), overflow: 'hidden' }}>
      {/* 深色标题栏 — 对齐老版 gacha-pool */}
      <div
        style={{
          display: 'flex',
          background: 'rgba(0,0,0,0.6)',
          padding: 0
        }}
      >
        {/* 卡池名 */}
        <div
          style={{
            background: 'rgba(0,0,0,0.8)',
            padding: '10px 0',
            display: 'flex',
            alignItems: 'center',
            borderRight: '1px solid rgba(255,255,255,0.3)',
            width: '130px',
            justifyContent: 'center'
          }}
        >
          <span style={{ fontSize: '20px', fontWeight: 'bold', fontFamily: FONT_NZBZ }}>{analysis.gachaTypeName}</span>
        </div>

        {/* 数据统计 — 对齐老版 stat-info 金色数字 */}
        <div style={{ display: 'flex', padding: '10px 20px 0', gap: '10px', flexWrap: 'wrap' }}>
          <InfoNum label='总抽卡' value={analysis.totalCount} />
          <InfoNum label='金卡' value={analysis.fiveStarCount} />
          <InfoNum label='紫卡' value={analysis.fourStarCount} />
          {analysis.pityCount > 0 && <InfoNum label='已垫' value={analysis.pityCount} />}
          {analysis.fiveStarAvg > 0 && <InfoNum label='平均出金' value={analysis.fiveStarAvg} />}
        </div>
      </div>

      {/* 角色/武器卡片区 — 对齐老版 gacha-stat card-list */}
      {analysis.fiveStarList.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            background: 'rgba(0,0,0,0.5)',
            padding: '5px 8px',
            gap: '3px'
          }}
        >
          {analysis.fiveStarList.map((item, i) => {
            const bgImg = item.rarity === 4 ? URL_ITEM_BG4 : URL_ITEM_BG5;
            // 所有五星视为UP (当前数据无isUp字段)
            const isUp = true;

            return (
              <div key={i} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: `${cardWidth}px`,
                    borderRadius: '6px',
                    background: '#fff',
                    boxShadow: isUp ? '0 0 8px 0 #ffeb73, 0 0 0 1px #fff100' : '0 0 0 1px #fff',
                    overflow: 'hidden'
                  }}
                >
                  {/* 图标区 */}
                  <div
                    style={{
                      width: `${cardWidth}px`,
                      height: `${cardWidth}px`,
                      borderRadius: '6px 6px 10px 0',
                      backgroundImage: `url(${bgImg})`,
                      backgroundSize: '100% 100%',
                      backgroundRepeat: 'no-repeat',
                      position: 'relative',
                      boxShadow: '0 0 3px 0 rgba(0,0,0,0.6)'
                    }}
                  >
                    {item.faceImg && <img src={item.faceImg} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}

                    {/* 抽数标签 — 对齐老版 item-life */}
                    <div
                      style={{
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        borderRadius: '10px 0 0 0',
                        fontSize: '16px',
                        padding: '0 6px',
                        minWidth: '20px',
                        height: '22px',
                        lineHeight: '22px',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        background: isUp ? '#ffeb73' : '#333',
                        color: isUp ? '#6f4b00' : '#fff',
                        boxShadow: isUp ? '0 0 3px 0 #6f4b00' : 'none'
                      }}
                    >
                      {item.count}
                    </div>
                  </div>

                  {/* 名称 — 对齐老版 item-name */}
                  <div
                    style={{
                      fontSize: '14px',
                      lineHeight: '24px',
                      color: isUp ? '#6f4b00' : '#000',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      padding: '0 2px'
                    }}
                  >
                    {item.name.length > 4 ? item.name.slice(0, 4) : item.name}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function StatLi({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ minWidth: '75px', textAlign: 'center', padding: '6px 10px', background: 'rgba(0,0,0,0.3)', borderRadius: '6px' }}>
      <div style={{ fontSize: '18px', fontWeight: 'bold', fontFamily: FONT_NZBZ }}>{value}</div>
      <div style={{ fontSize: '11px', opacity: 0.6, marginTop: '2px' }}>{label}</div>
    </div>
  );
}

function InfoNum({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ minWidth: '50px', padding: '0 10px' }}>
      <div style={{ color: '#ffde9d', height: '25px', lineHeight: '25px', fontSize: '22px', textShadow: '0 0 2px #000', fontFamily: FONT_NZBZ }}>{value}</div>
      <div style={{ fontSize: '12px', lineHeight: '14px', color: '#888' }}>{label}</div>
    </div>
  );
}
