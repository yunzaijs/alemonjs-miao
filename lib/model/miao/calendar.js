import { getIoRedis } from '@alemonjs/db';

const ANN_API = {
    gs: {
        listUrl: 'https://hk4e-api.mihoyo.com/common/hk4e_cn/announcement/api/getAnnList?game=hk4e&game_biz=hk4e_cn&lang=zh-cn&bundle_id=hk4e_cn&level=60&platform=pc&region=cn_gf01&uid=100000000',
        detailUrl: 'https://hk4e-api.mihoyo.com/common/hk4e_cn/announcement/api/getAnnContent?game=hk4e&game_biz=hk4e_cn&lang=zh-cn&bundle_id=hk4e_cn&level=60&platform=pc&region=cn_gf01&uid=100000000'
    },
    sr: {
        listUrl: 'https://hkrpg-api.mihoyo.com/common/hkrpg_cn/announcement/api/getAnnList?game=hkrpg&game_biz=hkrpg_cn&lang=zh-cn&bundle_id=hkrpg_cn&level=70&platform=pc&region=prod_gf_cn&uid=100000000',
        detailUrl: 'https://hkrpg-api-static.mihoyo.com/common/hkrpg_cn/announcement/api/getAnnContent?game=hkrpg&game_biz=hkrpg_cn&lang=zh-cn&bundle_id=hkrpg_cn&level=70&platform=pc&region=prod_gf_cn&uid=100000000'
    },
    zzz: {
        listUrl: 'https://announcement-api.mihoyo.com/common/nap_cn/announcement/api/getAnnList?game=nap&game_biz=nap_cn&lang=zh-cn&bundle_id=nap_cn&level=60&platform=pc&region=prod_gf_cn&uid=100000000',
        detailUrl: 'https://announcement-static.mihoyo.com/common/nap_cn/announcement/api/getAnnContent?game=nap&game_biz=nap_cn&lang=zh-cn&bundle_id=nap_cn&level=60&platform=pc&region=prod_gf_cn&uid=100000000'
    }
};
const IGNORE_TITLE_REG = /内容专题页|版本更新说明|调研|问卷|防沉迷|米游社|工具|创作者|社区|赛事|同人/;
function formatRemaining(ms) {
    if (ms <= 0) {
        return '已结束';
    }
    const hours = Math.floor(ms / 3600000);
    const days = Math.floor(hours / 24);
    if (days > 0) {
        return `${days}天${hours % 24}小时`;
    }
    if (hours > 0) {
        return `${hours}小时`;
    }
    return `${Math.floor(ms / 60000)}分钟`;
}
function parseTime(str) {
    return new Date(str.replace(/-/g, '/')).getTime();
}
function detectType(title) {
    if (/概率UP/.test(title)) {
        if (/(单手剑|双手剑|长柄武器|弓|法器|光锥)·/.test(title)) {
            return 'weapon';
        }
        if (/祈愿|跃迁|调频/.test(title)) {
            return 'character';
        }
    }
    if (/纪行|战令|月卡/.test(title)) {
        return 'pass';
    }
    if (/深境螺旋|忘却之庭|虚构叙事|幻想真境|幽境/.test(title)) {
        return 'abyss';
    }
    return 'activity';
}
const GAME_NAMES = {
    gs: '原神',
    sr: '星穹铁道',
    zzz: '绝区零'
};
const CACHE_KEY_PREFIX = 'data:alemonjs-mhy:calendar';
const CACHE_TTL = 600;
async function fetchCalendar(game) {
    const redis = getIoRedis();
    const cacheKey = `${CACHE_KEY_PREFIX}:${game}`;
    if (redis) {
        const cached = await redis.get(cacheKey);
        if (cached) {
            return JSON.parse(cached);
        }
    }
    const config = ANN_API[game];
    if (!config) {
        return null;
    }
    const listRes = await fetch(config.listUrl);
    if (!listRes.ok) {
        return null;
    }
    const listJson = (await listRes.json());
    if (listJson.retcode !== 0 || !listJson.data?.list) {
        return null;
    }
    const now = Date.now();
    const activities = [];
    for (const category of listJson.data.list) {
        for (const ann of category.list) {
            if (IGNORE_TITLE_REG.test(ann.title)) {
                continue;
            }
            const startMs = parseTime(ann.start_time);
            const endMs = parseTime(ann.end_time);
            if (endMs < now - 86400000) {
                continue;
            }
            if (startMs > now + 30 * 86400000) {
                continue;
            }
            const isActive = startMs <= now && endMs > now;
            const remainMs = isActive ? endMs - now : startMs - now;
            activities.push({
                id: ann.ann_id,
                title: ann.title.replace(/<[^>]+>/g, ''),
                type: detectType(ann.title),
                banner: ann.banner,
                icon: ann.tag_icon,
                startTime: ann.start_time,
                endTime: ann.end_time,
                isActive,
                remaining: isActive ? `剩余 ${formatRemaining(remainMs)}` : `${formatRemaining(remainMs)}后开始`
            });
        }
    }
    const typeOrder = {
        character: 0,
        weapon: 1,
        abyss: 2,
        pass: 3,
        activity: 4,
        other: 5
    };
    activities.sort((a, b) => {
        if (a.isActive !== b.isActive) {
            return a.isActive ? -1 : 1;
        }
        const ta = typeOrder[a.type] ?? 5;
        const tb = typeOrder[b.type] ?? 5;
        if (ta !== tb) {
            return ta - tb;
        }
        return parseTime(a.endTime) - parseTime(b.endTime);
    });
    const result = {
        game,
        gameName: GAME_NAMES[game] ?? game,
        activities,
        now: new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })
    };
    if (redis) {
        await redis.set(cacheKey, JSON.stringify(result), 'EX', CACHE_TTL);
    }
    return result;
}

export { fetchCalendar };
