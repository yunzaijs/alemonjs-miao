/**
 * 星穹铁道图鉴 — 星铁角色、武器(光锥)等信息图鉴
 * 命令: *希儿图鉴 / #星铁希儿图鉴
 */
import { createEvent, EventsEnum, Format, useMessage } from 'alemonjs';

function parseSrAtlasName(text: string): string {
  // *希儿图鉴
  const starMatch = text.match(/^\*(.+?)图鉴$/);

  if (starMatch) {
    return starMatch[1]?.trim() ?? '';
  }

  // #星铁希儿图鉴
  const prefixMatch = text.match(/^(?:!|！|\/|#|＃)星铁(.+?)图鉴$/);

  return prefixMatch?.[1]?.trim() ?? '';
}

export default (e: EventsEnum) => {
  const event = createEvent({
    event: e,
    selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
  });

  const [message] = useMessage(event);
  const text = e.MessageText;

  const name = parseSrAtlasName(text);

  if (!name) {
    const md = Format.createMarkdown();

    md.addText('请输入名称，如: *希儿图鉴');

    const format = Format.create();

    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  logger.debug('[srAtlas] 星铁图鉴查询', { name });

  const format = Format.create();
  const md = Format.createMarkdown();

  md.addText(`[星铁图鉴] 「${name}」图鉴功能暂未实现，敬请期待`);
  format.addMarkdown(md);
  void message.send({ format });
};
