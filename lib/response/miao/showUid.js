import UidCard from '../../img/views/UidCard.js';
import { createEvent, useMessage, Format } from 'alemonjs';
import { getUserMainUid, getUserCookie, queryMihoyoApi } from 'alemonjs-mhy';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

var showUid = async (e) => {
    const event = createEvent({
        event: e,
        selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
    });
    const [message] = useMessage(event);
    const userId = event.UserId;
    const game = e.miao?.game ?? 'gs';
    logger.debug('[showUid] 进入', { userId, game });
    const uid = await getUserMainUid(userId, game);
    if (!uid) {
        const md = Format.createMarkdown();
        md.addText('请先绑定UID: #绑定uid XXXXXXXXX');
        const format = Format.create();
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const hasCk = !!(await getUserCookie(userId));
    const [indexRes, charRes] = await Promise.all([queryMihoyoApi({ userId, game, api: 'index' }), queryMihoyoApi({ userId, game, api: 'character' })]);
    logger.debug('[showUid] API index', { success: indexRes.success });
    logger.debug('[showUid] API character', { success: charRes.success });
    const indexData = indexRes.data ?? {};
    const rawStats = indexData.stats ?? {};
    const stats = {
        activeDay: rawStats.active_day_number ?? rawStats.activeDay,
        achievement: rawStats.achievement_number ?? rawStats.achievement,
        wayPoint: rawStats.way_point_number ?? rawStats.wayPoint,
        avatar: rawStats.avatar_number ?? rawStats.avatar,
        commonChest: rawStats.common_chest_number ?? rawStats.commonChest,
        exquisiteChest: rawStats.exquisite_chest_number ?? rawStats.exquisiteChest,
        preciousChest: rawStats.precious_chest_number ?? rawStats.preciousChest,
        luxuriousChest: rawStats.luxurious_chest_number ?? rawStats.luxuriousChest,
        magicChest: rawStats.magic_chest_number ?? rawStats.magicChest
    };
    const rawAvatars = (charRes.data?.avatars ?? []);
    let avatar5 = 0;
    let goldCount = 0;
    const avatars = rawAvatars.map(a => {
        const rarity = a.rarity ?? 4;
        const cons = a.actived_constellation_num ?? 0;
        if (rarity === 5) {
            avatar5++;
            goldCount += cons + 1;
        }
        const weapon = a.weapon;
        if (weapon && weapon.rarity === 5) {
            goldCount += weapon.affix_level ?? 0;
        }
        return {
            id: a.id,
            name: a.name,
            element: a.element,
            level: a.level,
            rarity,
            cons,
            fetter: a.fetter ?? 0,
            icon: a.icon
        };
    });
    stats.avatar = Math.max(stats.avatar ?? 0, avatars.length);
    stats.avatar5 = avatar5;
    stats.goldCount = goldCount;
    const exploration = [];
    const rawExploration = indexData.world_explorations;
    if (rawExploration?.length) {
        const sorted = [...rawExploration].sort((a, b) => (a.id ?? 0) - (b.id ?? 0));
        for (const area of sorted) {
            const name = area.name;
            const pct = Math.round((area.exploration_percentage ?? 0) / 10);
            if (name && pct >= 0) {
                exploration.push({ name, pct });
            }
        }
    }
    const cardData = {
        uid: indexRes.uid ?? uid,
        game,
        nickname: indexData.role?.nickname ?? '',
        level: indexData.role?.level ?? 0,
        isSelfCk: hasCk,
        stats,
        exploration,
        avatars
    };
    const img = await renderComponentIsHtmlToBuffer(UidCard, { data: cardData });
    const format = Format.create();
    if (typeof img === 'boolean') {
        const md = Format.createMarkdown();
        md.addText('[UID] 图片渲染失败');
        format.addMarkdown(md);
    }
    else {
        format.addImage(img);
    }
    void message.send({ format });
};

export { showUid as default };
