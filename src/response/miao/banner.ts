/**
 * 复刻卡池统计 — 查看角色/武器复刻历史
 * 命令: #角色复刻统计 / #卡池统计 / #胡桃卡池
 */
import { getCharacterFace } from '@src/assets/character/index.js';
import BannerCard, { type BannerAllData, type BannerCardData, type BannerSingleData } from '@src/img/views/BannerCard';
import { getAllBannerStats, getCharBannerRecords, hasCharInPool } from '@src/model/miao/bannerData.js';
import { GS_CHARACTERS } from '@src/model/miao/characters.js';
import { createEvent, EventsEnum, Format, useMessage } from 'alemonjs';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

function parseBannerQuery(text: string): { charName: string; game: string } {
  const match = text.match(/^(?:!|！|\/|#|＃)(?:原神|星铁)?(?:(?:四星|五星)?(?:角色|武器|光锥|up)?|(.+?))(?:复刻)?(?:统计|卡池|祈愿)$/);

  const game = /星铁|光锥/.test(text) ? 'sr' : 'gs';
  const charName = match?.[1]?.trim() ?? '';

  return { charName, game };
}

/** 根据名称或简称查找角色 */
function findCharMeta(name: string) {
  for (const [, meta] of Object.entries(GS_CHARACTERS)) {
    if (meta.name === name || meta.abbr === name) {
      return meta;
    }
  }

  for (const [, meta] of Object.entries(GS_CHARACTERS)) {
    if (meta.name.includes(name) || name.includes(meta.name)) {
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

  const { charName } = parseBannerQuery(text);

  logger.debug('[banner] 进入', { charName });

  let cardData: BannerCardData;

  if (charName) {
    // 单角色查询
    const meta = findCharMeta(charName);

    if (!meta || !hasCharInPool(meta.name)) {
      const format = Format.create();
      const md = Format.createMarkdown();

      md.addText(`未找到角色「${charName}」的卡池记录`);
      format.addMarkdown(md);
      void message.send({ format });

      return;
    }

    const records = getCharBannerRecords(meta.name);

    cardData = {
      mode: 'single',
      charName: meta.name,
      element: meta.element,
      rarity: meta.rarity,
      faceImg: getCharacterFace('gs', meta.name),
      records
    } satisfies BannerSingleData;
  } else {
    // 全角色复刻排行
    const stats = getAllBannerStats();
    const list = stats.map(s => {
      const meta = findCharMeta(s.name);

      return {
        name: s.name,
        element: meta?.element ?? '',
        rarity: meta?.rarity ?? 5,
        faceImg: getCharacterFace('gs', s.name),
        upCount: s.upCount,
        lastVersion: s.lastVersion,
        daysSince: s.daysSince
      };
    });

    cardData = {
      mode: 'all',
      list
    } satisfies BannerAllData;
  }

  const img = await renderComponentIsHtmlToBuffer(BannerCard, { data: cardData });
  const format = Format.create();

  if (typeof img === 'boolean') {
    const md = Format.createMarkdown();

    md.addText('[卡池统计] 图片渲染失败');
    format.addMarkdown(md);
  } else {
    format.addImage(img);
  }

  void message.send({ format });
};
