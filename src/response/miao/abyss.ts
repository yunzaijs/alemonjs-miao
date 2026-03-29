/**
 * 深渊数据 — 查看本期/上期深境螺旋成绩
 * 命令: #深渊 / #深渊12 / #本期深渊 / #混沌回忆
 */
import AbyssCard, { type AbyssData } from '@src/img/views/AbyssCard';
import { createEvent, EventsEnum, Format, useMessage } from 'alemonjs';
import { queryMihoyoApi } from 'alemonjs-mhy';
import dayjs from 'dayjs';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

function parsePeriod(text: string): 1 | 2 {
  return /上期/.test(text) ? 2 : 1;
}

function parseAbyssGame(text: string): string {
  if (/星铁|混沌|忘却/.test(text)) {
    return 'sr';
  }

  return 'gs';
}

function formatTs(ts: string | number): string {
  const n = typeof ts === 'string' ? parseInt(ts, 10) : ts;

  return n > 0 ? dayjs.unix(n).format('MM/DD') : '';
}

export default async (e: EventsEnum) => {
  const event = createEvent({
    event: e,
    selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
  });

  const [message] = useMessage(event);
  const userId = event.UserId;
  const text = e.MessageText;
  const game = parseAbyssGame(text);
  const period = parsePeriod(text);

  logger.debug('[abyss] 进入', { userId, game, period });

  const result = await queryMihoyoApi({
    userId,
    game,
    api: 'spiralAbyss',
    query: { schedule_type: period }
  });

  logger.debug('[abyss] API 返回', { success: result.success, message: result.message });

  const format = Format.create();

  if (!result.success) {
    const md = Format.createMarkdown();

    md.addText(`[深渊] ${result.message}`);
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  const raw = result.data as Record<string, unknown>;
  const start = formatTs(raw.start_time as string);
  const end = formatTs(raw.end_time as string);

  const cardData: AbyssData = {
    uid: result.uid ?? '',
    game,
    schedule_id: (raw.schedule_id as number) ?? 0,
    start_time: raw.start_time as string,
    end_time: raw.end_time as string,
    total_battle_times: (raw.total_battle_times as number) ?? 0,
    total_win_times: (raw.total_win_times as number) ?? 0,
    max_floor: (raw.max_floor as string) ?? '',
    total_star: (raw.total_star as number) ?? 0,
    is_unlock: (raw.is_unlock as boolean) ?? true,
    reveal_rank: (raw.reveal_rank as AbyssData['reveal_rank']) ?? [],
    damage_rank: (raw.damage_rank as AbyssData['damage_rank']) ?? [],
    take_damage_rank: (raw.take_damage_rank as AbyssData['take_damage_rank']) ?? [],
    defeat_rank: (raw.defeat_rank as AbyssData['defeat_rank']) ?? [],
    energy_skill_rank: (raw.energy_skill_rank as AbyssData['energy_skill_rank']) ?? [],
    normal_skill_rank: (raw.normal_skill_rank as AbyssData['normal_skill_rank']) ?? [],
    floors: (raw.floors as AbyssData['floors']) ?? [],
    period: start && end ? `${start} ~ ${end}` : period === 1 ? '本期' : '上期'
  };

  const img = await renderComponentIsHtmlToBuffer(AbyssCard, { data: cardData });

  if (typeof img === 'boolean') {
    const md = Format.createMarkdown();

    md.addText('[深渊] 图片渲染失败');
    format.addMarkdown(md);
  } else {
    format.addImage(img);
  }

  void message.send({ format });
};
