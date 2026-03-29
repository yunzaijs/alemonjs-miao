/**
 * 角色攻略 — 查看角色培养攻略
 * 命令: #胡桃攻略 / #星铁希儿攻略
 */
import { createEvent, EventsEnum, Format, useMessage } from 'alemonjs';
import { queryMihoyoApi } from 'alemonjs-mhy';

function parseCharName(text: string): string {
  const match = text.match(/^(?:!|！|\/|#|＃)(?:星铁)?(.+?)(?:攻略|功略)$/);

  return match?.[1]?.replace(/喵喵/g, '').trim() ?? '';
}

export default async (e: EventsEnum) => {
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

  const result = await queryMihoyoApi({
    userId: event.UserId,
    game,
    api: 'strategy',
    query: { name: charName }
  });

  logger.debug('[strategy] API 返回', { success: result.success });

  const format = Format.create();

  if (!result.success) {
    const md = Format.createMarkdown();

    md.addText(`未找到角色「${charName}」的攻略数据`);
    format.addMarkdown(md);
  } else {
    const data = result.data as { image?: string; url?: string; title?: string };

    if (data.image) {
      format.addImage(data.image);
    } else if (data.url) {
      const md = Format.createMarkdown();

      md.addTitle(data.title ?? `${charName}攻略`);
      md.addLink(data.url, '点击查看攻略');
      format.addMarkdown(md);
    } else {
      const md = Format.createMarkdown();

      md.addText(`「${charName}」攻略暂无数据`);
      format.addMarkdown(md);
    }
  }

  void message.send({ format });
};
