/**
 * 今日素材 — 查看今日/明日可刷取素材
 * 命令: #今日素材 / #明日天赋 / #周一素材
 */
import MaterialCard, { type MaterialCardData } from '@src/img/views/MaterialCard';
import { createEvent, EventsEnum, Format, useMessage } from 'alemonjs';
import dayjs from 'dayjs';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

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

function getDayLabel(offset: number): string {
  if (offset === 0) {
    return '今日';
  }
  if (offset === 1) {
    return '明日';
  }

  const target = dayjs().add(offset, 'day');
  const dayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

  return dayNames[target.day()] ?? '今日';
}

export default async (e: EventsEnum) => {
  const event = createEvent({
    event: e,
    selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
  });

  const [message] = useMessage(event);
  const text = e.MessageText;

  const dayOffset = parseDayOffset(text);
  const targetDay = dayjs().add(dayOffset, 'day');
  const weekday = targetDay.day();

  logger.debug('[todayMaterial] 进入', { dayOffset, weekday });

  const cardData: MaterialCardData = {
    game: 'gs',
    weekday,
    dayLabel: getDayLabel(dayOffset)
  };

  const img = await renderComponentIsHtmlToBuffer(MaterialCard, { data: cardData });

  const format = Format.create();

  if (typeof img === 'boolean') {
    const md = Format.createMarkdown();

    md.addText('[素材] 图片渲染失败');
    format.addMarkdown(md);
  } else {
    format.addImage(img);
  }

  void message.send({ format });
};
