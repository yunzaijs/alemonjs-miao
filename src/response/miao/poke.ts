/**
 * 戳一戳响应 — 被戳时随机展示角色卡片
 * 事件: notice.create (poke 通知)
 */
import AvatarCard, { type AvatarCardData, type AvatarInfo } from '@src/img/views/AvatarCard';
import { createEvent, EventsEnum, Format, useMessage } from 'alemonjs';
import { getUserMainUid, queryMihoyoApi } from 'alemonjs-mhy';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

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

  logger.debug('[poke] 调用 queryMihoyoApi character');

  const result = await queryMihoyoApi({
    userId,
    game,
    api: 'character'
  });

  const format = Format.create();

  if (!result.success) {
    const md = Format.createMarkdown();

    md.addText(`[戳一戳] ${result.message}`);
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  const raw = result.data as { avatars?: AvatarInfo[] };
  const avatars = raw.avatars ?? [];

  if (avatars.length === 0) {
    return;
  }

  const picked = avatars[Math.floor(Math.random() * avatars.length)];

  const cardData: AvatarCardData = {
    uid: result.uid ?? uid,
    game,
    title: '戳一戳',
    avatar: picked
  };

  const img = await renderComponentIsHtmlToBuffer(AvatarCard, { data: cardData });

  if (typeof img === 'boolean') {
    const md = Format.createMarkdown();

    md.addText(`[戳一戳] ${picked.name}`);
    format.addMarkdown(md);
  } else {
    format.addImage(img);
  }

  void message.send({ format });
};
