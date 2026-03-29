/**
 * 提瓦特小助手 API — 深渊使用率/角色持有率
 */
import { getIoRedis } from '@alemonjs/db';

const BASE_URL = 'https://api.lelaer.com/ys';
const CACHE_PREFIX = 'data:miao:lelaer:cache';
const CACHE_TTL = 3600; // 1 小时缓存

// ─── 深渊使用率数据 ──────────────────────────────────

export interface AbyssRankItem {
  name: string;
  use_rate: number;
  own_rate?: number;
  rank_class: string; // "s1" | "s" | "a" | "b" | "f"
}

export interface AbyssRankResult {
  title: string;
  version: string;
  update: string;
  data: AbyssRankItem[];
}

// ─── 角色持有率数据 ──────────────────────────────────

export interface ConsStatItem {
  name: string; // 角色名
  hold_rate: number; // 持有率
  cons: number[]; // c0-c6 各命座百分比
  avg_cons: number; // 平均命座
}

export interface ConsStatResult {
  title: string;
  version: string;
  update: string;
  data: ConsStatItem[];
}

// ─── API 调用 ────────────────────────────────────────

async function cachedFetch<T>(cacheKey: string, url: string): Promise<T | null> {
  const redis = getIoRedis();

  // 读缓存
  const cached = await redis.get(`${CACHE_PREFIX}:${cacheKey}`);

  if (cached) {
    return JSON.parse(cached) as T;
  }

  // 发请求
  try {
    const resp = await fetch(url, {
      headers: {
        'User-Agent': 'MiaoPlugin/3.0',
        Referer: 'https://www.lelaer.com'
      }
    });

    if (!resp.ok) {
      return null;
    }

    const json = await resp.json();

    if (!json || (json.retcode !== undefined && json.retcode !== 0)) {
      return null;
    }

    const data = json.data ?? json;

    // 写缓存
    await redis.setex(`${CACHE_PREFIX}:${cacheKey}`, CACHE_TTL, JSON.stringify(data));

    return data as T;
  } catch {
    return null;
  }
}

/**
 * 获取深渊使用率排行
 * @param mode 'abyss' = 深渊 | 'hard' = 幽境危战
 */
export function getAbyssRank(mode: 'abyss' | 'hard' = 'abyss'): Promise<AbyssRankResult | null> {
  const endpoint = mode === 'hard' ? 'getAbyssRank2.php' : 'getAbyssRank.php';

  return cachedFetch<AbyssRankResult>(`abyss_rank_${mode}`, `${BASE_URL}/${endpoint}`);
}

/**
 * 获取角色持有率/命座分布
 */
export function getConsStat(): Promise<ConsStatResult | null> {
  return cachedFetch<ConsStatResult>('cons_stat', `${BASE_URL}/Statistics/Constellation`);
}
