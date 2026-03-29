/**
 * 武器列表 — 查看角色装备的武器
 * 命令: #武器 / #五星武器 / #四星武器
 * 修复 alemonjs-mhy WeaponCard data.avatars undefined 的问题
 */
import WeaponCard, { type WeaponCardData } from '@src/img/views/WeaponCard';
import { createEvent, EventsEnum, Format, useMessage } from 'alemonjs';
import { queryMihoyoApi } from 'alemonjs-mhy';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

export default async (e: EventsEnum) => {
  const event = createEvent({
    event: e,
    selects: ['private.message.create', 'message.create']
  });

  const [message] = useMessage(event);
  const userId = event.UserId;
  const text = e.MessageText ?? '';

  logger.debug('[weapon] 进入', { userId, text });

  const result = await queryMihoyoApi({
    userId,
    game: 'gs',
    api: 'character',
    body: {}
  });

  const format = Format.create();

  if (!result.success) {
    const md = Format.createMarkdown();

    md.addText(`[武器] ${result.message}`);
    format.addMarkdown(md);
  } else {
    const data = result.data as Record<string, unknown>;
    // 米游社 character/list API 返回 data.list 而非 data.avatars
    const avatars = (data.list ?? data.avatars ?? []) as WeaponCardData['avatars'];
    const img = await renderComponentIsHtmlToBuffer(WeaponCard, {
      data: { uid: result.uid ?? '', avatars, filterText: text }
    });

    format.addImage(img);
  }

  void message.send({ format });
};
