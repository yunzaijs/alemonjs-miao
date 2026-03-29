/**
 * 深渊出场率/使用率统计
 * 命令: #深渊出场率 / #深渊使用统计
 */
import { createEvent, EventsEnum, Format, useMessage } from 'alemonjs';
import { queryMihoyoApi } from 'alemonjs-mhy';

export default async (e: EventsEnum) => {
  const event = createEvent({
    event: e,
    selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
  });

  const [message] = useMessage(event);
  const game = e.miao?.game ?? 'gs';

  logger.debug('[abyssUsage] 进入', { game });

  const result = await queryMihoyoApi({
    userId: event.UserId,
    game,
    api: 'abyssUsage',
    query: {}
  });

  logger.debug('[abyssUsage] API 返回', { success: result.success });

  const format = Format.create();

  if (!result.success) {
    const md = Format.createMarkdown();

    md.addText(`[出场率] ${result.message}`);
    format.addMarkdown(md);
  } else {
    const data = result.data as { image?: string; summary?: string };

    if (data.image) {
      format.addImage(data.image);
    } else {
      const md = Format.createMarkdown();

      md.addText(data.summary ?? '暂无出场率数据');
      format.addMarkdown(md);
    }
  }

  void message.send({ format });
};
