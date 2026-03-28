/**
 * 角色排行榜 — 显示群内某角色的排名列表
 * 命令: #刻晴排行 / #甘雨排名 / #刻晴分排行 / #刻晴双爆排行
 */
import RankListCard from '@src/img/views/RankListCard';
import { fetchProfile } from '@src/model/miao/enka';
import { getRankConfig, getRankList, submitAllRanks } from '@src/model/miao/profileRank';
import { createEvent, EventsEnum, Format, useMessage } from 'alemonjs';
import { getUserMainUid } from 'alemonjs-mhy';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

/** 从文本中解析排名类型 */
function parseRankType(text: string): string {
  if (/分|评分|圣遗物|遗器|ACE/.test(text)) {
    return 'mark';
  }

  if (/双爆|双暴/.test(text)) {
    return 'crit';
  }

  return 'mark'; // 默认圣遗物评分
}

export default async (e: EventsEnum) => {
  const event = createEvent({
    event: e,
    selects: ['message.create', 'private.message.create']
  });

  const [message] = useMessage(event);
  const userId = event.UserId;
  const game = e.miao?.game ?? 'gs';
  const text = e.MessageText;
  const guildId = (e as any).GuildId as string | undefined;

  if (!guildId) {
    const md = Format.createMarkdown();

    md.addText('排名功能仅在群/频道内可用');

    const format = Format.create();

    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  if (game === 'zzz') {
    const md = Format.createMarkdown();

    md.addText('绝区零暂不支持排名');

    const format = Format.create();

    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  // 检查排名功能是否开启
  const cfg = await getRankConfig(guildId);

  if (cfg.status === 1) {
    const md = Format.createMarkdown();

    md.addText('本群排名功能已关闭，管理员可使用 #开启排名 开启');

    const format = Format.create();

    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  // 解析角色名和排名类型
  const nameMatch = text.match(/^(?:!|！|\/|#|＃)*(原神|星铁)?\s*(.{1,10})\s*(?:分|评分|圣遗物|遗器|双爆|双暴|ACE)?\s*(?:排名|排行)(?:榜)?/);
  const charName = nameMatch?.[2]?.trim();

  if (!charName) {
    const md = Format.createMarkdown();

    md.addText('请输入角色名，如: #刻晴排行');

    const format = Format.create();

    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  const type = parseRankType(text);

  // 获取自己的 UID 并提交排名
  const uid = await getUserMainUid(userId, game);

  if (uid) {
    const profile = await fetchProfile(uid, game);

    if (profile) {
      await submitAllRanks(guildId, uid, profile.avatars);
    }
  }

  // 从已提交排名的 UID 中找到该角色
  // 先尝试用自己的面板数据匹配角色 ID
  let charId: number | null = null;
  let charElement: string | undefined;

  if (uid) {
    const profile = await fetchProfile(uid, game);

    if (profile) {
      const matched = profile.avatars.find(
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        av => av.name === charName || av.abbr === charName || av.name.includes(charName) || charName.includes(av.name) || charName.includes(av.abbr)
      );

      if (matched) {
        charId = matched.id;
        charElement = matched.element;
      }
    }
  }

  if (!charId) {
    const md = Format.createMarkdown();

    md.addText(`未找到角色「${charName}」，请先使用 #更新面板 获取数据`);

    const format = Format.create();

    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  const entries = await getRankList(guildId, type, charId, cfg.number);

  const img = await renderComponentIsHtmlToBuffer(RankListCard, {
    data: { game, charName, charElement, type, entries }
  });

  if (typeof img === 'boolean') {
    const md = Format.createMarkdown();

    md.addText('排名图片渲染失败');

    const format = Format.create();

    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  const format = Format.create();

  format.addImage(img);
  void message.send({ format });
};
