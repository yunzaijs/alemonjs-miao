/**
 * 喵喵版本 — 展示插件版本信息
 * 命令: #喵喵版本
 */
import VersionCard, { type VersionCardData } from '@src/img/views/VersionCard';
import { createEvent, EventsEnum, Format, useMessage } from 'alemonjs';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

export default async (e: EventsEnum) => {
  const event = createEvent({
    event: e,
    selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
  });

  const [message] = useMessage(event);

  logger.debug('[version] 进入');

  const cardData: VersionCardData = {
    name: 'alemonjs-miao',
    version: '0.0.1',
    author: 'ningmengchongshui',
    description: 'Miao AlemonJS 版 — 原神/星铁多功能插件'
  };

  const img = await renderComponentIsHtmlToBuffer(VersionCard, { data: cardData });
  const format = Format.create();

  if (typeof img === 'boolean') {
    const md = Format.createMarkdown();

    md.addText('[版本信息] 图片渲染失败');
    format.addMarkdown(md);
  } else {
    format.addImage(img);
  }

  void message.send({ format });
};
