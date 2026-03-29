/**
 * 今日素材卡片 — 展示当日可刷取的天赋/武器突破素材
 */
import React from 'react';
import HTML from './HTML.js';
import { FONT_FAMILY, FONT_NZBZ, URL_BG01, URL_MAIN01, contStyle, contTitleStyle, formatDateZh } from './shared.js';

// ─── 静态素材日程数据 ─────────────────────────────────
// week: 1=周一/四, 2=周二/五, 3=周三/六, 0=周日(全部)

interface MaterialInfo {
  name: string;
  region: string;
  domain: string;
  week: number;
  type: 'talent' | 'weapon';
}

/** 原神 — 天赋素材 */
const GS_TALENT_MATERIALS: MaterialInfo[] = [
  // 蒙德
  { name: '自由', region: '蒙德', domain: '忘却之峡', week: 1, type: 'talent' },
  { name: '抗争', region: '蒙德', domain: '忘却之峡', week: 2, type: 'talent' },
  { name: '诗文', region: '蒙德', domain: '忘却之峡', week: 3, type: 'talent' },
  // 璃月
  { name: '繁荣', region: '璃月', domain: '太山府', week: 1, type: 'talent' },
  { name: '勤劳', region: '璃月', domain: '太山府', week: 2, type: 'talent' },
  { name: '黄金', region: '璃月', domain: '太山府', week: 3, type: 'talent' },
  // 稻妻
  { name: '浮世', region: '稻妻', domain: '菫色之庭', week: 1, type: 'talent' },
  { name: '风雅', region: '稻妻', domain: '菫色之庭', week: 2, type: 'talent' },
  { name: '天光', region: '稻妻', domain: '菫色之庭', week: 3, type: 'talent' },
  // 须弥
  { name: '诤言', region: '须弥', domain: '昏识塔', week: 1, type: 'talent' },
  { name: '巧思', region: '须弥', domain: '昏识塔', week: 2, type: 'talent' },
  { name: '笃行', region: '须弥', domain: '昏识塔', week: 3, type: 'talent' },
  // 枫丹
  { name: '公平', region: '枫丹', domain: '苍白的遗荣', week: 1, type: 'talent' },
  { name: '正义', region: '枫丹', domain: '苍白的遗荣', week: 2, type: 'talent' },
  { name: '秩序', region: '枫丹', domain: '苍白的遗荣', week: 3, type: 'talent' },
  // 纳塔
  { name: '竞争', region: '纳塔', domain: '荣花之期', week: 1, type: 'talent' },
  { name: '燃焰', region: '纳塔', domain: '荣花之期', week: 2, type: 'talent' },
  { name: '冲突', region: '纳塔', domain: '荣花之期', week: 3, type: 'talent' }
];

/** 原神 — 武器素材 */
const GS_WEAPON_MATERIALS: MaterialInfo[] = [
  // 蒙德
  { name: '高塔孤王', region: '蒙德', domain: '塞西莉亚苗圃', week: 1, type: 'weapon' },
  { name: '凛风奔狼', region: '蒙德', domain: '塞西莉亚苗圃', week: 2, type: 'weapon' },
  { name: '狮牙斗士', region: '蒙德', domain: '塞西莉亚苗圃', week: 3, type: 'weapon' },
  // 璃月
  { name: '孤云寒林', region: '璃月', domain: '震雷连山密宫', week: 1, type: 'weapon' },
  { name: '雾海云间', region: '璃月', domain: '震雷连山密宫', week: 2, type: 'weapon' },
  { name: '漆黑陨铁', region: '璃月', domain: '震雷连山密宫', week: 3, type: 'weapon' },
  // 稻妻
  { name: '鸣神御灵', region: '稻妻', domain: '砂流之庭', week: 1, type: 'weapon' },
  { name: '今昔剧画', region: '稻妻', domain: '砂流之庭', week: 2, type: 'weapon' },
  { name: '远海夷地', region: '稻妻', domain: '砂流之庭', week: 3, type: 'weapon' },
  // 须弥
  { name: '绿洲花园', region: '须弥', domain: '有顶塔', week: 1, type: 'weapon' },
  { name: '纯圣露滴', region: '须弥', domain: '有顶塔', week: 2, type: 'weapon' },
  { name: '烈日威权', region: '须弥', domain: '有顶塔', week: 3, type: 'weapon' },
  // 枫丹
  { name: '悠古弦音', region: '枫丹', domain: '深潮的余响', week: 1, type: 'weapon' },
  { name: '纯露之心', region: '枫丹', domain: '深潮的余响', week: 2, type: 'weapon' },
  { name: '纯圣之泪', region: '枫丹', domain: '深潮的余响', week: 3, type: 'weapon' },
  // 纳塔
  { name: '炽热之心', region: '纳塔', domain: '焰色的记忆', week: 1, type: 'weapon' },
  { name: '夜风呢喃', region: '纳塔', domain: '焰色的记忆', week: 2, type: 'weapon' },
  { name: '圣灵之纪', region: '纳塔', domain: '焰色的记忆', week: 3, type: 'weapon' }
];

const WEEK_LABELS: Record<number, string> = {
  1: '周一/周四',
  2: '周二/周五',
  3: '周三/周六',
  0: '周日 (全部可刷)'
};

const DAY_LABELS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

const REGION_COLORS: Record<string, string> = {
  蒙德: '#5ec4b6',
  璃月: '#c6923a',
  稻妻: '#b47cc6',
  须弥: '#7cb342',
  枫丹: '#42a5f5',
  纳塔: '#ef5350'
};

// ─── 数据类型 ────────────────────────────────────────

export interface MaterialCardData {
  game: string;
  /** 目标星期几 0=日 1=一 ... 6=六 */
  weekday: number;
  /** 显示文本: "今天" / "明天" / "周X" */
  dayLabel: string;
}

// ─── 辅助 ────────────────────────────────────────────

function getMaterialWeek(weekday: number): number {
  // 周日=0 全部; 周一=1,周四=1; 周二=2,周五=2; 周三=3,周六=3
  if (weekday === 0) {
    return 0;
  }

  return ((weekday - 1) % 3) + 1;
}

interface RegionGroup {
  region: string;
  talents: MaterialInfo[];
  weapons: MaterialInfo[];
}

function groupByRegion(talents: MaterialInfo[], weapons: MaterialInfo[]): RegionGroup[] {
  const regionOrder = ['蒙德', '璃月', '稻妻', '须弥', '枫丹', '纳塔'];
  const map = new Map<string, RegionGroup>();

  for (const r of regionOrder) {
    map.set(r, { region: r, talents: [], weapons: [] });
  }

  for (const t of talents) {
    map.get(t.region)?.talents.push(t);
  }

  for (const w of weapons) {
    map.get(w.region)?.weapons.push(w);
  }

  return regionOrder.map(r => map.get(r)!).filter(g => g.talents.length > 0 || g.weapons.length > 0);
}

// ─── 子组件 ──────────────────────────────────────────

function MaterialItem({ mat, color }: { mat: MaterialInfo; color: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6px 10px',
        background: 'rgba(0,0,0,0.15)',
        borderRadius: '6px',
        flex: 1,
        minWidth: '160px'
      }}
    >
      <div
        style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: color,
          flexShrink: 0
        }}
      />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
          {mat.type === 'talent' ? '「' : ''}
          {mat.name}
          {mat.type === 'talent' ? '」' : ''}
        </div>
        <div style={{ fontSize: '11px', opacity: 0.6 }}>{mat.domain}</div>
      </div>
      <div
        style={{
          fontSize: '10px',
          padding: '2px 6px',
          borderRadius: '8px',
          background: mat.type === 'talent' ? 'rgba(156,39,176,0.4)' : 'rgba(33,150,243,0.4)',
          color: '#fff'
        }}
      >
        {mat.type === 'talent' ? '天赋' : '武器'}
      </div>
    </div>
  );
}

function RegionSection({ group, isSunday }: { group: RegionGroup; isSunday: boolean }) {
  const color = REGION_COLORS[group.region] ?? '#888';

  return (
    <div style={contStyle({ padding: '0' })}>
      <div
        style={contTitleStyle({
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        })}
      >
        <span
          style={{
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            background: color,
            display: 'inline-block'
          }}
        />
        <span style={{ fontFamily: FONT_NZBZ, fontSize: '18px' }}>{group.region}</span>
        {isSunday && <span style={{ fontSize: '12px', opacity: 0.5, marginLeft: 'auto' }}>全部素材可刷</span>}
      </div>
      <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {group.talents.map((t, i) => (
          <MaterialItem key={`t-${i}`} mat={t} color={color} />
        ))}
        {group.weapons.map((w, i) => (
          <MaterialItem key={`w-${i}`} mat={w} color={color} />
        ))}
      </div>
    </div>
  );
}

// ─── 主组件 ──────────────────────────────────────────

export default function MaterialCard({ data }: { data: MaterialCardData }) {
  const week = getMaterialWeek(data.weekday);
  const isSunday = data.weekday === 0;
  const dayText = DAY_LABELS[data.weekday] ?? '未知';

  // 过滤当日可用素材
  const talents = isSunday ? GS_TALENT_MATERIALS : GS_TALENT_MATERIALS.filter(m => m.week === week);
  const weapons = isSunday ? GS_WEAPON_MATERIALS : GS_WEAPON_MATERIALS.filter(m => m.week === week);

  const groups = groupByRegion(talents, weapons);

  return (
    <HTML>
      <div
        style={{
          width: '600px',
          fontFamily: FONT_FAMILY,
          color: '#fff',
          backgroundImage: `url(${URL_BG01})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          paddingBottom: '10px'
        }}
      >
        {/* 遮罩 */}
        <img
          src={URL_MAIN01}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            pointerEvents: 'none'
          }}
        />

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
            <div style={{ fontFamily: FONT_NZBZ, fontSize: '28px', color: '#d3bc8e' }}>#{data.dayLabel}素材</div>
            <div style={{ fontSize: '13px', opacity: 0.6, marginTop: '4px' }}>
              {dayText} · {WEEK_LABELS[week]}
            </div>
          </div>
          <div style={{ fontSize: '13px', opacity: 0.5 }}>原神</div>
        </div>

        {/* 各区域素材 */}
        <div style={{ position: 'relative' }}>
          {groups.map(g => (
            <RegionSection key={g.region} group={g} isSunday={isSunday} />
          ))}
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
          Created by Miao-Plugin · {formatDateZh()}
        </div>
      </div>
    </HTML>
  );
}
