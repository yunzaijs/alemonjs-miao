/**
 * 喵喵帮助 — 展示 Miao 模块指令列表
 * 命令: #喵喵帮助 / #miao帮助
 */
import MiaoHelp from '@src/img/views/MiaoHelp';
import { createEvent, EventsEnum, Format, useMessage } from 'alemonjs';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

export default async (e: EventsEnum) => {
  const event = createEvent({
    event: e,
    selects: ['message.create', 'private.message.create']
  });

  const [message] = useMessage(event);

  const img = await renderComponentIsHtmlToBuffer(MiaoHelp, {});

  if (typeof img === 'boolean') {
    const md = Format.createMarkdown();

    md.addText('帮助图片渲染失败，请稍后重试');

    const format = Format.create();

    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  const format = Format.create();

  format.addImage(img);
  void message.send({ format });
};
