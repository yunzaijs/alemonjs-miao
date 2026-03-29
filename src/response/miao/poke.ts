/**
 * 戳一戳响应 — 被戳时随机展示角色卡片
 * 事件: notice.create (poke 通知)
 */
import { createEvent, EventsEnum, Format, useMessage } from 'alemonjs';
import { getUserMainUid, queryMihoyoApi } from 'alemonjs-mhy';

export default async (e: EventsEnum) => {
  const event = createEvent({
    event: e,
    selects: ['notice.create', 'private.notice.create']
  });

  const [message] = useMessage(event);
  const userId = event.UserId;
  const game = 'gs';

  logger.debug('[poke] 进入', { userId });

  const uid = await getUserMainUid(userId, game);

  logger.debug('[poke] uid', { uid });

  if (!uid) {
    return;
  }

  logger.debug('[poke] 调用 queryMihoyoApi');

  const result = await queryMihoyoApi({
    userId,
    game,
    api: 'avatarWife',
    query: { relationType: false, action: 'card' }
  });

  const format = Format.create();

  if (result.success) {
    const data = result.data as { image?: string; name?: string };

    if (data.image) {
      format.addImage(data.image);
    } else {
      const md = Format.createMarkdown();

      md.addText(data.name ? `[戳一戳] ${data.name}` : '暂无可展示的角色');
      format.addMarkdown(md);
    }
  } else {
    const md = Format.createMarkdown();

    md.addText(`[戳一戳] ${result.message}`);
    format.addMarkdown(md);
  }

  void message.send({ format });
};
