/**
 * 图鉴卡片 — 对齐 cvs-plugin 效果
 * SR: 大尺寸，立绘 + 属性面板 + 技能列表 + 星魂 + 升级材料
 * GS: 头像 + 属性面板 + 天赋 + 命座 + 固有天赋 + 材料
 */
import type { GsCharacterData } from '@src/model/miao/gsData.js';
import type { SrCharacterData } from '@src/model/miao/srData.js';
import React from 'react';
import HTML from './HTML.js';
import { contStyle, contTitleStyle, ELEM_BG, ELEMENT_COLORS, FONT_FAMILY, FONT_NZBZ, RARITY_COLORS } from './shared.js';

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
  /** GS 角色完整数据（从 miao-plugin JSON 加载） */
  gsData?: GsCharacterData;
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
// GS 图鉴卡片 — 原神角色图鉴（数据驱动）
// ═══════════════════════════════════════════════════════

/** 命座颜色 */
const GS_CONS_COLORS = ['#5cbac2', '#339d61', '#3e95b9', '#3955b7', '#531ba9', '#ff5722'];

/** 元素中文映射 */
const ELEM_CN: Record<string, string> = {
  pyro: '火',
  hydro: '水',
  anemo: '风',
  electro: '雷',
  dendro: '草',
  cryo: '冰',
  geo: '岩'
};

/** 武器类型中文映射 */
const WEAPON_CN: Record<string, string> = {
  sword: '单手剑',
  claymore: '双手剑',
  polearm: '长柄武器',
  bow: '弓',
  catalyst: '法器'
};

/** 突破属性中文 */
const GROW_ATTR_CN: Record<string, string> = {
  cpct: '暴击率',
  cdmg: '暴击伤害',
  mastery: '元素精通',
  recharge: '元素充能效率',
  heal: '治疗加成',
  hpPct: '生命值%',
  atkPct: '攻击力%',
  defPct: '防御力%',
  dmg: '元素伤害加成',
  phy: '物理伤害加成'
};

/** 去除 HTML 标签 */
function stripHtml(s: string): string {
  return s.replace(/<[^>]*>/g, '');
}

function GsAtlasCard({ data }: { data: AtlasCardData }) {
  const gs = data.gsData;
  const elemKey = gs?.elem ?? data.element ?? '';
  const elemCn = ELEM_CN[elemKey] ?? elemKey;
  const bgUrl = ELEM_BG[elemKey] ?? ELEM_BG[elemCn] ?? ELEM_BG['水'];
  const elemColor = ELEMENT_COLORS[elemCn] ?? ELEMENT_COLORS['水'];
  const star = gs?.star ?? data.rarity ?? 4;
  const rarityColor = RARITY_COLORS[star] ?? '#c6923a';
  const weaponCn = gs ? (WEAPON_CN[gs.weapon] ?? gs.weapon) : (data.weaponType ?? '');

  /** cont 面板 */
  const contBox = (children: React.ReactNode) => <div style={contStyle({ margin: '6px 0' })}>{children}</div>;

  /** cont-title 标题栏 */
  const contHead = (title: string) => (
    <div style={contTitleStyle({ borderRadius: '0', padding: '8px 16px' })}>
      <span style={{ fontFamily: FONT_NZBZ, fontSize: '15px' }}>{title}</span>
    </div>
  );

  /** 小标签 pill */
  const pill = (text: string, bg: string) => (
    <span
      style={{
        fontSize: '12px',
        padding: '2px 10px',
        borderRadius: '10px',
        background: bg,
        color: '#fff',
        display: 'inline-block',
        textShadow: '0 0 2px rgba(0,0,0,0.5)'
      }}
    >
      {text}
    </span>
  );

  /** 角色信息行 */
  const metaRow = (label: string, value: string) => (
    <div style={{ display: 'flex', fontSize: '13px', lineHeight: '1.8' }}>
      <span style={{ color: '#d3bc8e', width: '70px', flexShrink: 0 }}>{label}</span>
      <span style={{ color: '#fff' }}>{value}</span>
    </div>
  );

  /** 材料列表 */
  const materials = gs?.materials
    ? [gs.materials.gem, gs.materials.boss, gs.materials.specialty, gs.materials.normal, gs.materials.talent, gs.materials.weekly].filter(Boolean)
    : [];

  return (
    <HTML style={{ width: '600px' }}>
      <div
        style={{
          fontFamily: FONT_FAMILY,
          color: '#fff',
          width: '600px',
          backgroundImage: `url(${bgUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'left top',
          padding: '15px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* ═══ Header — 头像 + 角色信息 ═══ */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            padding: '16px',
            marginBottom: '8px',
            background: 'rgba(0,0,0,0.3)',
            borderRadius: '12px',
            backdropFilter: 'blur(4px)',
            position: 'relative'
          }}
        >
          {/* 头像 */}
          {data.faceImg && (
            <div
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '12px',
                overflow: 'hidden',
                border: `3px solid ${elemColor}`,
                boxShadow: `0 0 12px ${elemColor}40, 0 4px 8px rgba(0,0,0,0.5)`,
                flexShrink: 0
              }}
            >
              <img src={data.faceImg} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}

          {/* 右侧信息 */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0 }}>
            {/* 名字 + 称号 */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
              <span
                style={{
                  fontFamily: FONT_NZBZ,
                  fontSize: '32px',
                  textShadow: '0 0 3px #000, 2px 2px 4px rgba(0,0,0,0.7)',
                  lineHeight: '1.1'
                }}
              >
                {data.name}
              </span>
              {gs?.title && <span style={{ fontSize: '14px', color: '#d3bc8e', textShadow: '0 0 2px #000' }}>{gs.title}</span>}
            </div>

            {/* 星级 */}
            <div style={{ display: 'flex', gap: '1px', margin: '4px 0 8px' }}>
              {Array.from({ length: star }).map((_, i) => (
                <span key={i} style={{ fontSize: '16px', color: rarityColor, textShadow: `0 0 4px ${rarityColor}` }}>
                  ★
                </span>
              ))}
            </div>

            {/* 元素 + 武器 标签 */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {elemCn && pill(elemCn, elemColor)}
              {weaponCn && pill(weaponCn, 'rgba(255,255,255,0.15)')}
            </div>
          </div>

          {/* 底部渐变色条 */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              right: 0,
              height: '3px',
              borderRadius: '0 0 12px 12px',
              background: `linear-gradient(90deg, ${rarityColor}, ${elemColor})`
            }}
          />
        </div>

        {/* ═══ 角色信息 — 命之座/生日/归属/CV ═══ */}
        {gs && (gs.astro || gs.birthday || gs.allegiance || gs.cncv) && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0 24px',
              padding: '8px 16px',
              marginBottom: '8px',
              background: 'rgba(0,0,0,0.25)',
              borderRadius: '8px',
              backdropFilter: 'blur(2px)'
            }}
          >
            {gs.astro && metaRow('命之座', gs.astro)}
            {gs.birthday && metaRow('生日', gs.birthday)}
            {gs.allegiance && metaRow('归属', gs.allegiance)}
            {gs.cncv && metaRow('中文CV', gs.cncv)}
            {gs.jpcv && metaRow('日文CV', gs.jpcv)}
          </div>
        )}

        {/* ═══ 基础属性 — 2×2 网格 ═══ */}
        {gs &&
          contBox(
            <>
              {contHead('Lv.90 基础属性')}
              <div style={{ display: 'flex', flexWrap: 'wrap', padding: '6px' }}>
                {[
                  ['生命值', String(Math.round(gs.baseAttr.hp)), '#4fc3f7'],
                  ['攻击力', String(Math.round(gs.baseAttr.atk)), '#ef5350'],
                  ['防御力', String(Math.round(gs.baseAttr.def)), '#ffa726'],
                  [GROW_ATTR_CN[gs.growAttr.key] ?? gs.growAttr.key, gs.growAttr.value + '%', '#ab47bc']
                ].map(([label, value, accent]) => (
                  <div
                    key={label}
                    style={{
                      width: '50%',
                      padding: '6px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <div
                      style={{
                        width: '6px',
                        height: '28px',
                        borderRadius: '3px',
                        background: accent,
                        flexShrink: 0
                      }}
                    />
                    <div>
                      <div style={{ fontSize: '11px', color: '#d3bc8e' }}>{label}</div>
                      <div style={{ fontSize: '18px', fontFamily: FONT_NZBZ, lineHeight: '1.2' }}>{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

        {/* ═══ 突破材料 ═══ */}
        {materials.length > 0 &&
          contBox(
            <>
              {contHead('突破材料')}
              <div style={{ display: 'flex', flexWrap: 'wrap', padding: '8px 10px', gap: '6px' }}>
                {materials.map((mat, i) => (
                  <div
                    key={i}
                    style={{
                      flex: '1 1 auto',
                      minWidth: '75px',
                      padding: '6px 10px',
                      borderRadius: '6px',
                      background: 'rgba(0,0,0,0.3)',
                      textAlign: 'center',
                      fontSize: '12px',
                      lineHeight: '1.4',
                      textShadow: '0 0 2px #000'
                    }}
                  >
                    {mat}
                  </div>
                ))}
              </div>
            </>
          )}

        {/* ═══ 角色天赋 ═══ */}
        {gs &&
          gs.talents.length > 0 &&
          contBox(
            <>
              {contHead('角色天赋')}
              <div style={{ padding: '6px 10px' }}>
                {gs.talents.map((t, ti) => (
                  <div
                    key={t.key}
                    style={{
                      display: 'flex',
                      gap: '10px',
                      padding: '8px 0',
                      borderBottom: ti < gs.talents.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none'
                    }}
                  >
                    {/* 天赋内容 */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                        <span style={{ fontFamily: FONT_NZBZ, fontSize: '13px', color: '#d3bc8e' }}>
                          {t.key === 'a' ? '普通攻击' : t.key === 'e' ? '元素战技' : '元素爆发'}
                        </span>
                        <span style={{ fontSize: '13px', fontWeight: 'bold' }}>{t.name}</span>
                      </div>
                      {t.desc.length > 0 && (
                        <div style={{ fontSize: '12px', color: '#bbb', lineHeight: '1.5' }}>
                          {t.desc.slice(0, 2).map((d, i) => (
                            <div key={i}>{stripHtml(d)}</div>
                          ))}
                        </div>
                      )}
                      {t.tableNames.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', marginTop: '4px' }}>
                          {t.tableNames.slice(0, 6).map(tn => (
                            <span
                              key={tn}
                              style={{ fontSize: '11px', padding: '1px 6px', borderRadius: '3px', background: 'rgba(211,188,142,0.12)', color: '#d3bc8e' }}
                            >
                              {tn}
                            </span>
                          ))}
                          {t.tableNames.length > 6 && <span style={{ fontSize: '11px', padding: '1px 6px', color: '#888' }}>+{t.tableNames.length - 6}</span>}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

        {/* ═══ 固有天赋 ═══ */}
        {gs &&
          gs.passives.length > 0 &&
          contBox(
            <>
              {contHead('固有天赋')}
              <div style={{ padding: '6px 10px' }}>
                {gs.passives.map((p, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '6px 0',
                      borderBottom: i < gs.passives.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none'
                    }}
                  >
                    <div style={{ fontFamily: FONT_NZBZ, fontSize: '13px', color: '#d3bc8e', marginBottom: '2px' }}>📜 {p.name}</div>
                    <div style={{ fontSize: '12px', color: '#bbb', lineHeight: '1.5', paddingLeft: '18px' }}>
                      {p.desc.slice(0, 2).map((d, j) => (
                        <div key={j}>{stripHtml(d)}</div>
                      ))}
                      {p.desc.length > 2 && <div style={{ color: '#888' }}>...</div>}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

        {/* ═══ 命之座 ═══ */}
        {gs &&
          gs.constellations.length > 0 &&
          contBox(
            <>
              {contHead(`命之座 · ${gs.astro || '命之座'}`)}
              <div style={{ padding: '6px 10px' }}>
                {gs.constellations.map((c, i) => (
                  <div
                    key={c.index}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      padding: '6px 0',
                      borderBottom: i < gs.constellations.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none'
                    }}
                  >
                    {/* 命座序号圆圈 */}
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${GS_CONS_COLORS[i] ?? '#999'}, ${GS_CONS_COLORS[i] ?? '#999'}80)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: FONT_NZBZ,
                        fontSize: '14px',
                        flexShrink: 0,
                        marginTop: '2px',
                        boxShadow: `0 0 6px ${GS_CONS_COLORS[i] ?? '#999'}40`
                      }}
                    >
                      {c.index}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#d3bc8e', lineHeight: '1.6' }}>{c.name}</div>
                      <div style={{ fontSize: '12px', color: '#bbb', lineHeight: '1.5' }}>
                        {c.desc.slice(0, 2).map((d, j) => (
                          <div key={j}>{stripHtml(d)}</div>
                        ))}
                        {c.desc.length > 2 && <div style={{ color: '#888' }}>...</div>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

        {/* 提示 + 底栏 */}
        <div style={{ textAlign: 'center', padding: '6px 0 2px', fontSize: '12px', color: 'rgba(255,255,255,0.5)', textShadow: '0 0 1px #000' }}>
          输入
          <span style={{ color: '#d3bc8e' }}>
            #{data.name}天赋、#{data.name}命座
          </span>
          可查看详细信息
        </div>
        <div style={{ textAlign: 'right', padding: '2px 10px 4px', fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>Miao By ALemonJS</div>
      </div>
    </HTML>
  );
}

// ─── 通用分区标题 (SR 用) ────────────────────────────

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
