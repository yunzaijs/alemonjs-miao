/**
 */
import UidCard, { type UidAvatar, type UidCardData, type UidExploration, type UidStats } from '@src/img/views/UidCard';
import { createEvent, EventsEnum, Format, useMessage } from 'alemonjs';
import { getUserCookie, getUserMainUid, queryMihoyoApi } from 'alemonjs-mhy';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

export default async (e: EventsEnum) => {
  const event = createEvent({
    event: e,
    selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
  });

  const [message] = useMessage(event);
  const userId = event.UserId;
  const game = (e.miao?.game as string) ?? 'gs';

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

  // ── 并行请求 index + character ──
  const [indexRes, charRes] = await Promise.all([queryMihoyoApi({ userId, game, api: 'index' }), queryMihoyoApi({ userId, game, api: 'character' })]);

  logger.debug('[showUid] API index', { success: indexRes.success });
  logger.debug('[showUid] API character', { success: charRes.success });

  // ── 解析 index 数据 ──
  const indexData = indexRes.data ?? {};
  const rawStats = indexData.stats ?? {};

  const stats: UidStats = {
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

  // 五星角色数和金卡总数从角色列表计算
  const rawAvatars: Array<Record<string, unknown>> = (charRes.data?.avatars ?? []) as Array<Record<string, unknown>>;
  let avatar5 = 0;
  let goldCount = 0;

  const avatars: UidAvatar[] = rawAvatars.map(a => {
    const rarity = (a.rarity as number) ?? 4;
    const cons = (a.actived_constellation_num as number) ?? 0;

    if (rarity === 5) {
      avatar5++;
      goldCount += cons + 1;
    }

    // 计入五星武器精炼
    const weapon = a.weapon as Record<string, unknown> | undefined;

    if (weapon && (weapon.rarity as number) === 5) {
      goldCount += (weapon.affix_level as number) ?? 0;
    }

    return {
      id: a.id as number,
      name: a.name as string,
      element: a.element as string,
      level: a.level as number,
      rarity,
      cons,
      fetter: (a.fetter as number) ?? 0,
      icon: a.icon as string
    };
  });

  stats.avatar = Math.max(stats.avatar ?? 0, avatars.length);
  stats.avatar5 = avatar5;
  stats.goldCount = goldCount;

  // ── 探索度 ──
  const exploration: UidExploration[] = [];
  const rawExploration = indexData.world_explorations as Array<Record<string, unknown>> | undefined;

  if (rawExploration?.length) {
    // 探索度排序: id 小的区域排前面
    const sorted = [...rawExploration].sort((a, b) => ((a.id as number) ?? 0) - ((b.id as number) ?? 0));

    for (const area of sorted) {
      const name = area.name as string;
      const pct = Math.round(((area.exploration_percentage as number) ?? 0) / 10);

      if (name && pct >= 0) {
        exploration.push({ name, pct });
      }
    }
  }

  // ── 构建卡片数据 ──
  const cardData: UidCardData = {
    uid: indexRes.uid ?? uid,
    game,
    nickname: (indexData.role?.nickname as string) ?? '',
    level: (indexData.role?.level as number) ?? 0,
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
  } else {
    format.addImage(img);
  }

  void message.send({ format });
};
