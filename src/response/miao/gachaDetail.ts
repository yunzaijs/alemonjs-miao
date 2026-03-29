/**
 * 抽卡记录/分析 — 查看抽卡记录明细
 * 命令: #喵喵抽卡记录 / #角色池祈愿 / #武器池分析
 */
import { createEvent, EventsEnum, Format, useMessage } from 'alemonjs';
import { getUserMainUid, queryMihoyoApi } from 'alemonjs-mhy';

function parseGachaType(text: string, game: string): number {
  const msg = text.replace(/(!|！|\/|#|＃|喵喵|星铁|抽卡|记录|祈愿|分析|池)/g, '');

  if (game === 'sr') {
    if (/常驻/.test(msg)) {
      return 1;
    }

    if (/联动武器|武器联动|联动光锥|光锥联动/.test(msg)) {
      return 22;
    }

    if (/联动角色|角色联动/.test(msg)) {
      return 21;
    }

    if (/武器|光锥/.test(msg)) {
      return 12;
    }

    return 11;
  }

  if (/常驻/.test(msg)) {
    return 200;
  }

  if (/武器/.test(msg)) {
    return 302;
  }

  if (/集录/.test(msg)) {
    return 500;
  }

  return 301;
}

export default async (e: EventsEnum) => {
  const event = createEvent({
    event: e,
    selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
  });

  const [message] = useMessage(event);
  const userId = event.UserId;
  const text = e.MessageText;
  const game = /星铁/.test(text) ? 'sr' : (e.miao?.game ?? 'gs');

  logger.debug('[gachaDetail] 进入', { userId, game });

  const uid = await getUserMainUid(userId, game);

  logger.debug('[gachaDetail] uid', { uid });

  if (!uid) {
    const md = Format.createMarkdown();

    md.addText('请先绑定UID: #绑定uid XXXXXXXXX');

    const format = Format.create();

    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  const type = parseGachaType(text, game);

  logger.debug('[gachaDetail] 调用 API', { uid, type });

  const result = await queryMihoyoApi({
    userId,
    game,
    api: 'gachaDetail',
    query: { uid, type }
  });

  const format = Format.create();

  if (!result.success) {
    const md = Format.createMarkdown();

    md.addText(`UID:${uid} 暂无抽卡记录，请通过【#抽卡帮助】获得绑定帮助`);
    format.addMarkdown(md);
  } else {
    const data = result.data as { image?: string; summary?: string };

    if (data.image) {
      format.addImage(data.image);
    } else {
      const md = Format.createMarkdown();

      md.addText(data.summary ?? '暂无抽卡数据');
      format.addMarkdown(md);
    }
  }

  void message.send({ format });
};
