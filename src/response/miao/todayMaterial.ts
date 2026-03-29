/**
 * 今日素材 — 查看今日/明日可刷取素材
 * 命令: #今日素材 / #明日天赋 / #周一素材
 */
import { createEvent, EventsEnum, Format, useMessage } from 'alemonjs';
import { queryMihoyoApi } from 'alemonjs-mhy';
import dayjs from 'dayjs';

function parseDayOffset(text: string): number {
  if (/明[日天]/.test(text)) {
    return 1;
  }

  const weekMatch = text.match(/周([1-7]|一|二|三|四|五|六|日)/);

  if (weekMatch) {
    const weekMap: Record<string, number> = {
      一: 1,
      二: 2,
      三: 3,
      四: 4,
      五: 5,
      六: 6,
      日: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 0
    };
    const targetDay = weekMap[weekMatch[1]] ?? 0;
    const today = dayjs().day();
    const diff = (targetDay - today + 7) % 7;

    return diff === 0 ? 7 : diff;
  }

  return 0;
}

export default async (e: EventsEnum) => {
  const event = createEvent({
    event: e,
    selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
  });

  const [message] = useMessage(event);
  const text = e.MessageText;
  const game = e.miao?.game ?? 'gs';

  const dayOffset = parseDayOffset(text);

  logger.debug('[todayMaterial] 进入', { game, dayOffset });

  const result = await queryMihoyoApi({
    userId: event.UserId,
    game,
    api: 'todayMaterial',
    query: { dayOffset }
  });

  logger.debug('[todayMaterial] API 返回', { success: result.success });

  const format = Format.create();

  if (!result.success) {
    const md = Format.createMarkdown();

    md.addText(`[素材] ${result.message}`);
    format.addMarkdown(md);
  } else {
    const data = result.data as { image?: string; summary?: string };

    if (data.image) {
      format.addImage(data.image);
    } else {
      const md = Format.createMarkdown();

      md.addText(data.summary ?? '暂无素材数据');
      format.addMarkdown(md);
    }
  }

  void message.send({ format });
};
