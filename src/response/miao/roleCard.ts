/**
 * 月谕圣牌 / 幻想卡片 — 查看幻想真境剧诗的圣牌数据
 * 命令: #月谕圣牌 / #幻想卡片
 */
import RoleCombatCard, { type RoleCombatData } from '@src/img/views/RoleCombatCard';
import { createEvent, EventsEnum, Format, useMessage } from 'alemonjs';
import { queryMihoyoApi } from 'alemonjs-mhy';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

export default async (e: EventsEnum) => {
  const event = createEvent({
    event: e,
    selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
  });

  const [message] = useMessage(event);
  const userId = event.UserId;

  logger.debug('[roleCard] 进入', { userId });

  const result = await queryMihoyoApi({
    userId,
    game: 'gs',
    api: 'roleCombat',
    query: { need_detail: true }
  });

  logger.debug('[roleCard] API 返回', { success: result.success, message: result.message });

  const format = Format.create();

  if (!result.success) {
    const md = Format.createMarkdown();

    md.addText(`[月谕圣牌] ${result.message}`);
    format.addMarkdown(md);
  } else {
    const cardData = { ...result.data, uid: result.uid ?? '' } as RoleCombatData;
    const img = await renderComponentIsHtmlToBuffer(RoleCombatCard, { data: cardData });

    if (typeof img === 'boolean') {
      const md = Format.createMarkdown();

      md.addText('[月谕圣牌] 图片渲染失败');
      format.addMarkdown(md);
    } else {
      format.addImage(img);
    }
  }

  void message.send({ format });
};
