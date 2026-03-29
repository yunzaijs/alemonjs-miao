/**
 * 复刻卡池统计 — 查看角色/武器复刻历史
 * 命令: #角色复刻统计 / #卡池统计 / #胡桃卡池
 */
import { createEvent, EventsEnum, Format, useMessage } from 'alemonjs';
import { queryMihoyoApi } from 'alemonjs-mhy';

function parseBannerQuery(text: string): { charName: string; game: string } {
  const match = text.match(/^(?:!|！|\/|#|＃)(?:原神|星铁)?(?:(?:四星|五星)?(?:角色|武器|光锥|up)?|(.+?))(?:复刻)?(?:统计|卡池|祈愿)$/);

  const game = /星铁|光锥/.test(text) ? 'sr' : 'gs';
  const charName = match?.[1]?.trim() ?? '';

  return { charName, game };
}

export default async (e: EventsEnum) => {
  const event = createEvent({
    event: e,
    selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
  });

  const [message] = useMessage(event);
  const text = e.MessageText;

  const { charName, game } = parseBannerQuery(text);

  logger.debug('[banner] 进入', { charName, game });

  const result = await queryMihoyoApi({
    userId: event.UserId,
    game,
    api: 'banner',
    query: { name: charName, text }
  });

  logger.debug('[banner] API 返回', { success: result.success });

  const format = Format.create();

  if (!result.success) {
    const md = Format.createMarkdown();

    md.addText(`卡池数据获取失败: ${result.message}`);
    format.addMarkdown(md);
  } else {
    const data = result.data as { image?: string; summary?: string };

    if (data.image) {
      format.addImage(data.image);
    } else {
      const md = Format.createMarkdown();

      md.addText(data.summary ?? '暂无卡池数据');
      format.addMarkdown(md);
    }
  }

  void message.send({ format });
};
