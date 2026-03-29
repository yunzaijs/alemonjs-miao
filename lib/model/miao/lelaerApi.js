import { getIoRedis } from '@alemonjs/db';

const BASE_URL = 'https://api.lelaer.com/ys';
const CACHE_PREFIX = 'data:miao:lelaer:cache';
const CACHE_TTL = 3600;
async function cachedFetch(cacheKey, url) {
    const redis = getIoRedis();
    const cached = await redis.get(`${CACHE_PREFIX}:${cacheKey}`);
    if (cached) {
        return JSON.parse(cached);
    }
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
        await redis.setex(`${CACHE_PREFIX}:${cacheKey}`, CACHE_TTL, JSON.stringify(data));
        return data;
    }
    catch {
        return null;
    }
}
function getAbyssRank(mode = 'abyss') {
    const endpoint = mode === 'hard' ? 'getAbyssRank2.php' : 'getAbyssRank.php';
    return cachedFetch(`abyss_rank_${mode}`, `${BASE_URL}/${endpoint}`);
}
function getConsStat() {
    return cachedFetch('cons_stat', `${BASE_URL}/Statistics/Constellation`);
}

export { getAbyssRank, getConsStat };
