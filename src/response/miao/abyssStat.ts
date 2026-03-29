/**
 * 角色持有率/命座分布 — 查看全服角色持有率统计
 * 命令: #角色持有率 / #角色命座分布
 */
import { getCharacterFace } from '@src/assets/character/index.js';
import AbyssStatCard, { type AbyssStatCardData, type AbyssStatItem } from '@src/img/views/AbyssStatCard';
import { GS_CHARACTERS } from '@src/model/miao/characters.js';
import { getConsStat } from '@src/model/miao/lelaerApi.js';
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

  logger.debug('[abyssStat] 进入');

  const result = await getConsStat();

  if (!result?.data || result.data.length === 0) {
    const format = Format.create();
    const md = Format.createMarkdown();

    md.addText('[角色持有率] 数据获取失败，请稍后重试');
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  const list: AbyssStatItem[] = result.data.map(item => {
    const meta = findCharMeta(item.name);

    return {
      name: item.name,
      element: meta?.element ?? '',
      rarity: meta?.rarity ?? 5,
      faceImg: getCharacterFace('gs', item.name),
      holdRate: item.hold_rate,
      avgCons: item.avg_cons,
      cons: item.cons
    };
  });

  const cardData: AbyssStatCardData = {
    title: '角色持有率',
    version: result.version ?? '',
    update: result.update ?? '',
    list
  };

  const img = await renderComponentIsHtmlToBuffer(AbyssStatCard, { data: cardData });
  const format = Format.create();

  if (typeof img === 'boolean') {
    const md = Format.createMarkdown();

    md.addText('[角色持有率] 图片渲染失败');
    format.addMarkdown(md);
  } else {
    format.addImage(img);
  }

  void message.send({ format });
};
