/**
 * 角色攻略 — 查看角色培养攻略
 * 命令: #胡桃攻略 / #星铁希儿攻略
 */
import { createEvent, EventsEnum, Format, useMessage } from 'alemonjs';

function parseCharName(text: string): string {
  const match = text.match(/^(?:!|！|\/|#|＃)(?:星铁)?(.+?)(?:攻略|功略)$/);

  return match?.[1]?.replace(/喵喵/g, '').trim() ?? '';
}

export default (e: EventsEnum) => {
  const event = createEvent({
    event: e,
    selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
  });

  const [message] = useMessage(event);
  const text = e.MessageText;
  const game = e.miao?.game ?? 'gs';

  const charName = parseCharName(text);

  if (!charName) {
    const md = Format.createMarkdown();

    md.addText('请输入角色名，如: #胡桃攻略');

    const format = Format.create();

    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  logger.debug('[strategy] 进入', { charName, game });

  const format = Format.create();
  const md = Format.createMarkdown();

  md.addText('[攻略] 角色攻略功能暂未实现，敬请期待');
  format.addMarkdown(md);
  void message.send({ format });
};
