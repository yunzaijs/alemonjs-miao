/**
 * 排名管理 — 开启/关闭/重置排名 (管理员专用)
 * 命令: #开启排名 / #关闭排名 / #重置排名
 */
import { resetRank, setRankConfig } from '@src/model/miao/profileRank';
import { createEvent, EventsEnum, Format, useMessage } from 'alemonjs';

export default async (e: EventsEnum) => {
  const event = createEvent({
    event: e,
    selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
  });

  const [message] = useMessage(event);
  const text = e.MessageText;
  const guildId = (e as any).GuildId as string | undefined;
  const isMaster = event.IsMaster;

  logger.debug('[rankAdmin] 进入', { guildId, isMaster });

  if (!guildId) {
    const md = Format.createMarkdown();

    md.addText('排名管理仅在群/频道内可用');

    const format = Format.create();

    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  if (!isMaster) {
    const md = Format.createMarkdown();

    md.addText('排名管理仅限管理员使用');

    const format = Format.create();

    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  // 开启排名
  if (/开启|打开|启用/.test(text)) {
    await setRankConfig(guildId, { status: 0 });

    const md = Format.createMarkdown();

    md.addText('已开启群内排名功能');

    const format = Format.create();

    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  // 关闭排名
  if (/关闭|禁用/.test(text)) {
    await setRankConfig(guildId, { status: 1 });

    const md = Format.createMarkdown();

    md.addText('已关闭群内排名功能');

    const format = Format.create();

    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  // 重置排名
  if (/重置|重设|清空/.test(text)) {
    const count = await resetRank(guildId, null);

    const md = Format.createMarkdown();

    md.addText(`已重置群内排名数据 (清除 ${count} 条记录)`);

    const format = Format.create();

    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  const md = Format.createMarkdown();

  md.addText('排名管理命令: #开启排名 / #关闭排名 / #重置排名');

  const format = Format.create();

  format.addMarkdown(md);
  void message.send({ format });
};
