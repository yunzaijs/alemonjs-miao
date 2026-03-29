import { getIoRedis } from '@alemonjs/db';
import { getCharacterFace } from '../../assets/character/index.js';

const GACHA_KEY_PREFIX = 'data:miao:gacha';
function gachaListKey(uid, game, gachaType) {
    return `${GACHA_KEY_PREFIX}:${game}:${uid}:${gachaType}`;
}
function gachaAuthKeyKey(uid) {
    return `${GACHA_KEY_PREFIX}:authkey:${uid}`;
}
const GS_GACHA_TYPES = {
    301: '角色活动祈愿',
    302: '武器活动祈愿',
    200: '常驻祈愿',
    500: '集录祈愿'
};
const SR_GACHA_TYPES = {
    11: '角色活动跃迁',
    12: '光锥活动跃迁',
    1: '常驻跃迁',
    21: '联动角色跃迁',
    22: '联动光锥跃迁'
};
function extractAuthKey(text) {
    const match = text.match(/authkey=([^&]+)/);
    if (!match) {
        return null;
    }
    return decodeURIComponent(match[1]);
}
async function saveAuthKey(uid, authkey) {
    const redis = getIoRedis();
    await redis.setex(gachaAuthKeyKey(uid), 86400, authkey);
}
function getAuthKey(uid) {
    const redis = getIoRedis();
    return redis.get(gachaAuthKeyKey(uid));
}
const GS_GACHA_API = 'https://public-operation-hk4e-sg.hoyoverse.com/gacha_info/api/getGachaLog';
const SR_GACHA_API = 'https://api-os-takumi.mihoyo.com/common/gacha_record/api/getGachaLog';
async function fetchGachaPage(authkey, gachaType, endId, game) {
    const baseUrl = game === 'sr' ? SR_GACHA_API : GS_GACHA_API;
    const gameBiz = game === 'sr' ? 'hkrpg_global' : 'hk4e_global';
    const params = new URLSearchParams({
        authkey_ver: '1',
        sign_type: '2',
        auth_appid: 'webview_gacha',
        gacha_type: String(gachaType),
        page: '1',
        size: '20',
        end_id: endId,
        game_biz: gameBiz,
        lang: 'zh-cn',
        authkey
    });
    const url = `${baseUrl}?${params.toString()}`;
    const resp = await fetch(url);
    const json = (await resp.json());
    if (json.retcode !== 0 || !json.data) {
        if (json.retcode === -101) {
            throw new Error('authkey 已过期，请重新获取');
        }
        throw new Error(json.message || `API 错误: ${json.retcode}`);
    }
    return json.data.list.map(item => ({
        id: item.id,
        name: item.name,
        itemType: item.item_type,
        rankType: Number(item.rank_type),
        gachaType: Number(item.gacha_type),
        time: item.time
    }));
}
async function fetchAllGachaLogs(authkey, gachaType, game) {
    const allItems = [];
    let endId = '0';
    for (let i = 0; i < 100; i++) {
        const page = await fetchGachaPage(authkey, gachaType, endId, game);
        if (page.length === 0) {
            break;
        }
        allItems.push(...page);
        endId = page[page.length - 1].id;
        await new Promise(r => setTimeout(r, 300));
    }
    return allItems;
}
async function saveGachaLogs(uid, game, gachaType, items) {
    const redis = getIoRedis();
    const key = gachaListKey(uid, game, gachaType);
    const existing = await loadGachaLogs(uid, game, gachaType);
    const idSet = new Set(existing.map(e => e.id));
    const merged = [...existing];
    for (const item of items) {
        if (!idSet.has(item.id)) {
            merged.push(item);
            idSet.add(item.id);
        }
    }
    merged.sort((a, b) => (BigInt(b.id) > BigInt(a.id) ? 1 : -1));
    await redis.set(key, JSON.stringify(merged));
}
async function loadGachaLogs(uid, game, gachaType) {
    const redis = getIoRedis();
    const key = gachaListKey(uid, game, gachaType);
    const raw = await redis.get(key);
    if (!raw) {
        return [];
    }
    return JSON.parse(raw);
}
function analyzeGacha(items, gachaType, game) {
    const typeName = game === 'sr' ? (SR_GACHA_TYPES[gachaType] ?? `池${gachaType}`) : (GS_GACHA_TYPES[gachaType] ?? `池${gachaType}`);
    const sorted = [...items].sort((a, b) => (BigInt(b.id) > BigInt(a.id) ? 1 : -1));
    let fiveCount = 0;
    let fourCount = 0;
    let threeCount = 0;
    let pityCount = 0;
    const fiveStarList = [];
    let countSinceLast = 0;
    const reversed = [...sorted].reverse();
    for (const item of reversed) {
        countSinceLast++;
        if (item.rankType === 5) {
            fiveCount++;
            fiveStarList.push({
                name: item.name,
                count: countSinceLast,
                time: item.time,
                faceImg: getCharacterFace(game, item.name),
                rarity: 5
            });
            countSinceLast = 0;
        }
        else if (item.rankType === 4) {
            fourCount++;
        }
        else {
            threeCount++;
        }
    }
    pityCount = countSinceLast;
    fiveStarList.reverse();
    const fiveStarAvg = fiveCount > 0 ? Math.round((sorted.length - pityCount) / fiveCount) : 0;
    return {
        gachaType,
        gachaTypeName: typeName,
        totalCount: sorted.length,
        fiveStarCount: fiveCount,
        fourStarCount: fourCount,
        threeStarCount: threeCount,
        pityCount,
        fiveStarAvg,
        fiveStarList
    };
}
async function analyzeAllGacha(uid, game) {
    const types = game === 'sr' ? [11, 12, 1] : [301, 302, 200, 500];
    const analyses = [];
    let totalCount = 0;
    let totalFive = 0;
    let totalFour = 0;
    for (const t of types) {
        const items = await loadGachaLogs(uid, game, t);
        if (items.length > 0) {
            const analysis = analyzeGacha(items, t, game);
            analyses.push(analysis);
            totalCount += analysis.totalCount;
            totalFive += analysis.fiveStarCount;
            totalFour += analysis.fourStarCount;
        }
    }
    return { analyses, totalCount, totalFive, totalFour };
}

export { GS_GACHA_TYPES, SR_GACHA_TYPES, analyzeAllGacha, analyzeGacha, extractAuthKey, fetchAllGachaLogs, getAuthKey, loadGachaLogs, saveAuthKey, saveGachaLogs };
