import { getIoRedis } from '@alemonjs/db';
import { scoreCharacterArtifacts } from './artisMark.js';

const RANK_PREFIX = 'data:alemonjs-miao:rank';
const RANK_TTL = 365 * 24 * 3600;
function rankKey(guildId, type, charId) {
    return `${RANK_PREFIX}:${guildId}:${type}:${charId}`;
}
function cfgKey(guildId) {
    return `${RANK_PREFIX}:${guildId}:cfg`;
}
const DEFAULT_CFG = {
    status: 0,
    number: 15
};
async function getRankConfig(guildId) {
    const redis = getIoRedis();
    if (!redis) {
        return DEFAULT_CFG;
    }
    const raw = await redis.get(cfgKey(guildId));
    if (!raw) {
        return DEFAULT_CFG;
    }
    return JSON.parse(raw);
}
async function setRankConfig(guildId, cfg) {
    const redis = getIoRedis();
    if (!redis) {
        return;
    }
    const current = await getRankConfig(guildId);
    const merged = { ...current, ...cfg };
    await redis.set(cfgKey(guildId), JSON.stringify(merged), 'EX', RANK_TTL);
}
function calcRankValues(avatar) {
    const artScore = scoreCharacterArtifacts(avatar);
    let critRate = 0;
    let critDmg = 0;
    if (avatar.stats) {
        for (const stat of avatar.stats) {
            if (stat.key === 'critRate' || stat.name === '暴击率') {
                critRate = parseFloat(stat.value.replace('%', '')) || 0;
            }
            if (stat.key === 'critDmg' || stat.name === '暴击伤害') {
                critDmg = parseFloat(stat.value.replace('%', '')) || 0;
            }
        }
    }
    return {
        mark: artScore.totalMark,
        crit: Math.round((critRate + critDmg) * 10) / 10
    };
}
async function submitRank(guildId, uid, avatar) {
    const redis = getIoRedis();
    if (!redis) {
        return;
    }
    const values = calcRankValues(avatar);
    const charId = avatar.id;
    const mkKey = rankKey(guildId, 'mark', charId);
    await redis.zadd(mkKey, values.mark, uid);
    await redis.expire(mkKey, RANK_TTL);
    const crKey = rankKey(guildId, 'crit', charId);
    await redis.zadd(crKey, values.crit, uid);
    await redis.expire(crKey, RANK_TTL);
}
async function submitAllRanks(guildId, uid, avatars) {
    for (const avatar of avatars) {
        if (avatar.artifacts && avatar.artifacts.length > 0) {
            await submitRank(guildId, uid, avatar);
        }
    }
}
async function getRankList(guildId, type, charId, limit) {
    const redis = getIoRedis();
    if (!redis) {
        return [];
    }
    const key = rankKey(guildId, type, charId);
    const results = await redis.zrevrange(key, 0, limit - 1, 'WITHSCORES');
    const entries = [];
    for (let i = 0; i < results.length; i += 2) {
        entries.push({
            uid: results[i],
            score: parseFloat(results[i + 1]),
            rank: Math.floor(i / 2) + 1
        });
    }
    return entries;
}
async function getGroupTop(guildId, type, charId) {
    const list = await getRankList(guildId, type, charId, 1);
    return list[0] ?? null;
}
async function getUserRank(guildId, type, charId, uid) {
    const redis = getIoRedis();
    if (!redis) {
        return null;
    }
    const key = rankKey(guildId, type, charId);
    const rank = await redis.zrevrank(key, uid);
    if (rank === null) {
        return null;
    }
    const score = await redis.zscore(key, uid);
    return {
        uid,
        score: parseFloat(score ?? '0'),
        rank: rank + 1
    };
}
async function resetRank(guildId, charId) {
    const redis = getIoRedis();
    if (!redis) {
        return 0;
    }
    if (charId !== null) {
        const keys = [rankKey(guildId, 'mark', charId), rankKey(guildId, 'crit', charId)];
        let count = 0;
        for (const k of keys) {
            count += await redis.del(k);
        }
        return count;
    }
    const pattern = `${RANK_PREFIX}:${guildId}:*`;
    let cursor = '0';
    let totalDeleted = 0;
    do {
        const [nextCursor, keys] = await redis.scan(cursor, 'MATCH', pattern, 'COUNT', 100);
        cursor = nextCursor;
        if (keys.length > 0) {
            totalDeleted += await redis.del(...keys);
        }
    } while (cursor !== '0');
    return totalDeleted;
}

export { calcRankValues, getGroupTop, getRankConfig, getRankList, getUserRank, resetRank, setRankConfig, submitAllRanks, submitRank };
