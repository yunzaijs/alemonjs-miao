/**
 * 角色持有率/命座分布 — 查看全服角色持有率统计
 * 命令: #角色持有率 / #角色命座分布
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

  logger.debug('[abyssStat] 进入', { game });

  const result = await queryMihoyoApi({
    userId: event.UserId,
    game,
    api: 'abyssStat',
    query: {}
  });

  logger.debug('[abyssStat] API 返回', { success: result.success });

  const format = Format.create();

  if (!result.success) {
    const md = Format.createMarkdown();

    md.addText(`[角色统计] ${result.message}`);
    format.addMarkdown(md);
  } else {
    const data = result.data as { image?: string; summary?: string };

    if (data.image) {
      format.addImage(data.image);
    } else {
      const md = Format.createMarkdown();

      md.addText(data.summary ?? '暂无统计数据');
      format.addMarkdown(md);
    }
  }

  void message.send({ format });
};
