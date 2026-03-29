/**
 * 深渊出场率/使用率统计
 * 命令: #深渊出场率 / #深渊使用统计
 */
import { getCharacterFace } from '@src/assets/character/index.js';
import AbyssUsageCard, { type AbyssUsageCardData, type AbyssUsageItem } from '@src/img/views/AbyssUsageCard';
import { GS_CHARACTERS } from '@src/model/miao/characters.js';
import { getAbyssRank } from '@src/model/miao/lelaerApi.js';
import { createEvent, EventsEnum, Format, useMessage } from 'alemonjs';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

/** 根据名称查找角色元数据 */
function findCharMeta(name: string) {
  for (const [, meta] of Object.entries(GS_CHARACTERS)) {
    if (meta.name === name || meta.abbr === name) {
      return meta;
    }
  }

  return null;
}

export default async (e: EventsEnum) => {
  const event = createEvent({
    event: e,
    selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
  });

  const [message] = useMessage(event);
  const text = e.MessageText;

  const mode = /幽境/.test(text) ? ('hard' as const) : ('abyss' as const);

  logger.debug('[abyssUsage] 进入', { mode });

  const result = await getAbyssRank(mode);

  if (!result?.data || result.data.length === 0) {
    const format = Format.create();
    const md = Format.createMarkdown();

    md.addText('[深渊使用率] 数据获取失败，请稍后重试');
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  const list: AbyssUsageItem[] = result.data.map(item => {
    const meta = findCharMeta(item.name);

    return {
      name: item.name,
      element: meta?.element ?? '',
      rarity: meta?.rarity ?? 5,
      faceImg: getCharacterFace('gs', item.name),
      useRate: item.use_rate,
      rankClass: item.rank_class
    };
  });

  const title = mode === 'hard' ? '幽境危战使用率' : '深渊使用率';

  const cardData: AbyssUsageCardData = {
    title,
    version: result.version ?? '',
    update: result.update ?? '',
    list
  };

  const img = await renderComponentIsHtmlToBuffer(AbyssUsageCard, { data: cardData });
  const format = Format.create();

  if (typeof img === 'boolean') {
    const md = Format.createMarkdown();

    md.addText(`[${title}] 图片渲染失败`);
    format.addMarkdown(md);
  } else {
    format.addImage(img);
  }

  void message.send({ format });
};
