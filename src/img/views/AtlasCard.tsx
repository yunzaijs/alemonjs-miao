/**
 * 图鉴卡片 — 对齐 cvs-plugin 效果
 * SR: 大尺寸，立绘 + 属性面板 + 技能列表 + 星魂 + 升级材料
 * GS: 角色头像 + 基础信息面板
 */
import type { SrCharacterData } from '@src/model/miao/srData.js';
import React from 'react';
import HTML from './HTML.js';
import { ELEM_BG, ELEMENT_COLORS, FONT_FAMILY, FONT_NZBZ, RARITY_COLORS } from './shared.js';

// ─── 数据类型 ────────────────────────────────────────

export interface AtlasCardData {
  name: string;
  game: 'gs' | 'sr';
  gameLabel: string;
  element?: string;
  rarity?: number;
  weaponType?: string;
  faceImg?: string;
  /** SR 角色完整数据（从 cvs-plugin JSON 加载） */
  srData?: SrCharacterData;
  /** SR 元素图标 */
  elementIcon?: string;
  /** SR 命途图标 */
  pathIcon?: string;
  /** SR 星星图标 */
  starIcon?: string;
}

// ─── 稀有度色条 ──────────────────────────────────────

const RARITY_BAR: Record<number, string> = {
  2: '#8bddb8',
  3: '#80aeee',
  4: '#ba98f8',
  5: '#f7d07e'
};

// ─── 星魂颜色 ────────────────────────────────────────

const EIDOLON_COLORS = ['#5cbac2', '#339d61', '#3e95b9', '#3955b7', '#531ba9', '#ff5722'];

// ─── 武器类型图标 (GS only) ──────────────────────────

const WEAPON_ICONS: Record<string, string> = {
  单手剑: '🗡️',
  双手剑: '⚔️',
  长柄武器: '🔱',
  弓: '🏹',
  法器: '📖'
};

// ═══════════════════════════════════════════════════════
// SR 图鉴卡片 — 对齐 cvs-plugin character/index.html
// ═══════════════════════════════════════════════════════

function SrAtlasCard({ data }: { data: AtlasCardData }) {
  const sr = data.srData!;
  const elemColor = ELEMENT_COLORS[sr.element] ?? '#7e57c2';

  return (
    <HTML style={{ width: '800px' }}>
      <div
        style={{
          fontFamily: FONT_FAMILY,
          color: '#333',
          background: '#e6e6e6',
          width: '800px'
        }}
      >
        {/* ═══ 顶部: 立绘 + 角色信息 ═══ */}
        <div
          style={{
            position: 'relative',
            height: '380px',
            background: '#fff',
            overflow: 'hidden',
            display: 'flex'
          }}
        >
          {/* 左: 角色立绘 */}
          <div style={{ width: '360px', position: 'relative', flexShrink: 0 }}>
            {sr.portrait ? (
              <img
                src={sr.portrait}
                style={{
                  position: 'absolute',
                  left: '-40px',
                  top: '-20px',
                  height: '420px',
                  objectFit: 'contain',
                  filter: 'drop-shadow(4px 4px 8px rgba(0,0,0,0.3))'
                }}
              />
            ) : data.faceImg ? (
              <img
                src={data.faceImg}
                style={{
                  position: 'absolute',
                  left: '80px',
                  top: '60px',
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: `4px solid ${elemColor}`
                }}
              />
            ) : null}
          </div>

          {/* 右: 角色信息面板 */}
          <div style={{ flex: 1, padding: '30px 30px 20px 0', position: 'relative', zIndex: 2 }}>
            {/* 名称 */}
            <div style={{ fontFamily: FONT_NZBZ, fontSize: '36px', color: '#000' }}>{sr.name}</div>

            {/* 星级 */}
            <div style={{ display: 'flex', gap: '2px', marginTop: '4px' }}>
              {Array.from({ length: sr.rarity }).map((_, i) => data.starIcon ? (
                  <img key={i} src={data.starIcon} style={{ width: '28px', height: '28px' }} />
                ) : (
                  <span key={i} style={{ fontSize: '24px', color: RARITY_COLORS[sr.rarity] ?? '#c6923a' }}>
                    ★
                  </span>
                )
              )}
            </div>

            {/* 命途 & 元素图标 */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '10px', alignItems: 'center' }}>
              {data.pathIcon && <img src={data.pathIcon} style={{ width: '36px', height: '36px' }} />}
              {data.elementIcon && <img src={data.elementIcon} style={{ width: '36px', height: '36px' }} />}
              <span style={{ fontSize: '16px', color: '#666', marginLeft: '4px' }}>
                {sr.path} · {sr.element}
              </span>
            </div>

            {/* 基础属性 2列 */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px',
                marginTop: '16px'
              }}
            >
              {sr.baseAttr.map(attr => (
                <div
                  key={attr.key}
                  style={{
                    width: '195px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'rgba(242,242,242,0.9)',
                    border: '1px solid rgba(204,204,204,0.9)',
                    borderRadius: '4px 16px 4px 4px',
                    padding: '6px 14px',
                    fontSize: '13px'
                  }}
                >
                  <span style={{ color: '#666' }}>{attr.name}</span>
                  <span style={{ fontWeight: 'bold' }}>{attr.num}</span>
                </div>
              ))}
            </div>

            {/* 简介 */}
            {sr.desc && (
              <div style={{ marginTop: '12px', fontSize: '12px', color: '#999', lineHeight: '1.5' }}>
                {sr.desc.length > 60 ? sr.desc.slice(0, 60) + '...' : sr.desc}
              </div>
            )}
          </div>
        </div>

        {/* ═══ 升级材料 ═══ */}
        {sr.materials.length > 0 && (
          <div style={{ margin: '10px 20px' }}>
            <SectionTitle title='升级消耗 (Lv1-Lv80)' />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '12px 0' }}>
              {sr.materials.slice(0, 12).map(mat => (
                <div
                  key={mat.id}
                  style={{
                    width: '180px',
                    display: 'flex',
                    alignItems: 'center',
                    background: 'rgba(242,242,242,0.9)',
                    border: '1px solid rgba(204,204,204,0.9)',
                    borderRadius: '8px',
                    padding: '6px 8px',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* 稀有度色条 */}
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: '6px',
                      background: RARITY_BAR[mat.rarity] ?? '#80aeee',
                      borderRadius: '8px 0 0 8px'
                    }}
                  />
                  {mat.icon && <img src={mat.icon} style={{ width: '32px', height: '32px', marginLeft: '10px', marginRight: '8px', borderRadius: '50%' }} />}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '12px', color: '#333', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{mat.name}</div>
                    <div style={{ fontSize: '11px', color: '#999' }}>×{mat.num}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ 角色行迹（技能） ═══ */}
        {sr.skills.length > 0 && (
          <div style={{ margin: '10px 20px' }}>
            <SectionTitle title='角色行迹' />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', padding: '12px 0' }}>
              {sr.skills.map(skill => (
                <div
                  key={skill.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    background: 'rgba(242,242,242,0.9)',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    border: '1px solid rgba(204,204,204,0.9)'
                  }}
                >
                  {skill.icon && (
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: '#2a2625',
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden'
                      }}
                    >
                      <img src={skill.icon} style={{ width: '32px', height: '32px' }} />
                    </div>
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>{skill.name}</span>
                      <span
                        style={{
                          fontSize: '11px',
                          color: '#fff',
                          background: '#2a2625',
                          borderRadius: '4px',
                          padding: '1px 6px'
                        }}
                      >
                        {skill.type_text}
                      </span>
                      {skill.max_level > 1 && <span style={{ fontSize: '11px', color: '#999' }}>Lv1-Lv{skill.max_level}</span>}
                    </div>
                    <div style={{ fontSize: '12px', color: '#666', marginTop: '3px', lineHeight: '1.4' }}>{skill.simple_desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ 星魂 ═══ */}
        {sr.eidolons.length > 0 && (
          <div style={{ margin: '10px 20px' }}>
            <SectionTitle title='星魂' />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', padding: '12px 0' }}>
              {sr.eidolons.map((eid, i) => (
                <div
                  key={eid.id}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    background: 'rgba(242,242,242,0.9)',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    border: '1px solid rgba(204,204,204,0.9)',
                    borderLeft: `4px solid ${EIDOLON_COLORS[i] ?? '#999'}`
                  }}
                >
                  {eid.icon && (
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: '#2a2625',
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden'
                      }}
                    >
                      <img src={eid.icon} style={{ width: '32px', height: '32px' }} />
                    </div>
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>
                      <span style={{ color: EIDOLON_COLORS[i] ?? '#999', marginRight: '6px' }}>{i + 1}魂</span>
                      {eid.name}
                    </div>
                    <div style={{ fontSize: '12px', color: '#666', marginTop: '3px', lineHeight: '1.5' }}>{eid.effect}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 底栏 */}
        <div style={{ textAlign: 'right', padding: '8px 24px 12px', fontSize: '12px', color: '#aaa' }}>Miao By ALemonJS</div>
      </div>
    </HTML>
  );
}

// ═══════════════════════════════════════════════════════
// GS 图鉴卡片 — 原神角色图鉴（丰富版）
// ═══════════════════════════════════════════════════════

/** 天赋类型描述 */
const GS_TALENTS = [
  { label: '普通攻击', icon: '⚔️', desc: '进行普通攻击与重击' },
  { label: '元素战技', icon: '🔮', desc: '施放元素战技造成元素伤害' },
  { label: '元素爆发', icon: '💫', desc: '施放元素爆发造成大量伤害' },
  { label: '固有天赋 1', icon: '📜', desc: '角色解锁即拥有的被动天赋' },
  { label: '固有天赋 2', icon: '📜', desc: '突破后解锁的被动天赋' }
];

/** 命座结构 */
const GS_CONS = ['第一重', '第二重', '第三重', '第四重', '第五重', '第六重'];
const GS_CONS_ICONS = ['①', '②', '③', '④', '⑤', '⑥'];
const GS_CONS_COLORS = ['#5cbac2', '#339d61', '#3e95b9', '#3955b7', '#531ba9', '#ff5722'];

function GsAtlasCard({ data }: { data: AtlasCardData }) {
  const elemColor = ELEMENT_COLORS[data.element ?? ''] ?? '#888';
  const bgUrl = ELEM_BG[data.element ?? ''] ?? ELEM_BG['水'];
  const rarityColor = RARITY_COLORS[data.rarity ?? 4] ?? '#c6923a';

  return (
    <HTML style={{ width: '800px' }}>
      <div
        style={{
          fontFamily: FONT_FAMILY,
          color: '#fff',
          backgroundImage: `url(${bgUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'left top',
          position: 'relative',
          width: '800px'
        }}
      >
        {/* ═══ 顶部: 头像 + 角色信息面板 ═══ */}
        <div
          style={{
            position: 'relative',
            padding: '30px',
            display: 'flex',
            gap: '24px',
            alignItems: 'flex-start'
          }}
        >
          {/* 角色头像 */}
          <div
            style={{
              width: '180px',
              height: '180px',
              borderRadius: '16px',
              overflow: 'hidden',
              border: `4px solid ${elemColor}`,
              boxShadow: `0 0 20px ${elemColor}50, 0 4px 12px rgba(0,0,0,0.4)`,
              flexShrink: 0,
              background: 'rgba(0,0,0,0.3)'
            }}
          >
            {data.faceImg ? (
              <img src={data.faceImg} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', opacity: 0.3 }}>
                ?
              </div>
            )}
          </div>

          {/* 右侧信息 */}
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: FONT_NZBZ, fontSize: '36px', color: '#d3bc8e', textShadow: '0 2px 6px rgba(0,0,0,0.5)' }}>{data.name}</div>

            {/* 星级 */}
            {data.rarity && (
              <div style={{ display: 'flex', gap: '3px', marginTop: '6px' }}>
                {Array.from({ length: data.rarity }).map((_, i) => (
                  <span key={i} style={{ fontSize: '22px', color: rarityColor, textShadow: `0 0 6px ${rarityColor}` }}>
                    ★
                  </span>
                ))}
              </div>
            )}

            {/* 元素 + 武器类型标签 */}
            <div style={{ marginTop: '12px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {data.element && (
                <span
                  style={{
                    padding: '4px 16px',
                    borderRadius: '14px',
                    background: `${elemColor}90`,
                    fontSize: '15px',
                    fontWeight: 'bold',
                    boxShadow: `0 0 8px ${elemColor}40`
                  }}
                >
                  {data.element}
                </span>
              )}
              {data.weaponType && (
                <span
                  style={{ padding: '4px 16px', borderRadius: '14px', background: 'rgba(255,255,255,0.18)', fontSize: '15px', backdropFilter: 'blur(4px)' }}
                >
                  {WEAPON_ICONS[data.weaponType] ?? ''} {data.weaponType}
                </span>
              )}
              <span style={{ padding: '4px 16px', borderRadius: '14px', background: 'rgba(232,213,176,0.25)', fontSize: '13px' }}>原神</span>
            </div>

            {/* 基础属性行 */}
            <div style={{ marginTop: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {data.element && <GsAttrTag label='元素' value={data.element} color={elemColor} />}
              {data.rarity && <GsAttrTag label='稀有度' value={'★'.repeat(data.rarity)} color={rarityColor} />}
              {data.weaponType && <GsAttrTag label='武器' value={data.weaponType} color='#aaa' />}
            </div>
          </div>
        </div>

        {/* ═══ 天赋 ═══ */}
        <div style={{ margin: '0 20px 10px' }}>
          <GsSectionTitle title='角色天赋' />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '10px 0' }}>
            {GS_TALENTS.map((t, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 14px',
                  background: 'rgba(0,0,0,0.2)',
                  borderRadius: '8px',
                  borderLeft: `3px solid ${elemColor}`
                }}
              >
                <span style={{ fontSize: '24px', flexShrink: 0, width: '32px', textAlign: 'center' }}>{t.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{t.label}</div>
                  <div style={{ fontSize: '12px', opacity: 0.5, marginTop: '2px' }}>{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ 命之座 ═══ */}
        <div style={{ margin: '0 20px 10px' }}>
          <GsSectionTitle title='命之座' />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '10px 0' }}>
            {GS_CONS.map((label, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 14px',
                  background: 'rgba(0,0,0,0.2)',
                  borderRadius: '8px',
                  borderLeft: `4px solid ${GS_CONS_COLORS[i]}`
                }}
              >
                <span style={{ fontSize: '22px', fontWeight: 'bold', color: GS_CONS_COLORS[i], width: '28px', textAlign: 'center', flexShrink: 0 }}>
                  {GS_CONS_ICONS[i]}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{label}</div>
                  <div style={{ fontSize: '12px', opacity: 0.5, marginTop: '2px' }}>命之座 · 第{i + 1}重</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 底栏 */}
        <div style={{ textAlign: 'right', padding: '8px 24px 12px', fontSize: '12px', opacity: 0.4 }}>Miao By ALemonJS</div>
      </div>
    </HTML>
  );
}

/** 属性标签 */
function GsAttrTag({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6px 14px',
        background: 'rgba(0,0,0,0.25)',
        borderRadius: '4px 16px 4px 4px',
        borderLeft: `3px solid ${color}`,
        minWidth: '160px'
      }}
    >
      <span style={{ fontSize: '13px', opacity: 0.6 }}>{label}</span>
      <span style={{ fontSize: '14px', fontWeight: 'bold', marginLeft: 'auto' }}>{value}</span>
    </div>
  );
}

/** GS 分区标题 */
function GsSectionTitle({ title }: { title: string }) {
  return (
    <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '8px', padding: '10px 20px', boxShadow: '0 0 1px 0 rgba(255,255,255,0.3)' }}>
      <span style={{ fontFamily: FONT_NZBZ, fontSize: '18px', color: '#d3bc8e' }}>{title}</span>
    </div>
  );
}

// ─── 通用分区标题 ────────────────────────────────────

function SectionTitle({ title }: { title: string }) {
  return (
    <div
      style={{
        background: '#2a2625',
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        padding: '10px 20px'
      }}
    >
      <span style={{ fontFamily: FONT_NZBZ, fontSize: '18px', color: '#d6c297' }}>{title}</span>
    </div>
  );
}

// ─── 主组件（自动分流 GS / SR） ─────────────────────

export default function AtlasCard({ data }: { data: AtlasCardData }) {
  if (data.game === 'sr' && data.srData) {
    return <SrAtlasCard data={data} />;
  }

  return <GsAtlasCard data={data} />;
}
