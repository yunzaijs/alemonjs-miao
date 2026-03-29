/**
 * 幽境危战
 * 命令: #幽境危战 / #幽境 / #危战
 */
import HardChallengeCard, { type HardChallengeData, type HardChallengeEntry } from '@src/img/views/HardChallengeCard';
import { createEvent, EventsEnum, Format, useMessage } from 'alemonjs';
import { queryMihoyoApi } from 'alemonjs-mhy';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

// ─── 原始 API 类型 ──────────────────────────────────

interface RawApiResponse {
  best: {
    best: {
      difficulty: number;
      second: number;
      has_data: boolean;
    };
    challenge: Array<{
      name: string;
      monster: {
        level: number;
        icon: string;
        desc: string[];
      };
      second: number;
      teams: Array<{
        avatar_id: number;
        name: string;
        level: number;
        rarity: number;
        rank: number;
      }>;
      best_avatar: Array<{
        avatar_id: number;
        dps: number;
      }>;
    }>;
  };
  schedule: {
    start_time: number;
    end_time: number;
  };
}

import dayjs from 'dayjs';

function formatTimestamp(ts: number): string {
  return dayjs.unix(ts).format('MM-DD HH:mm');
}

function transformApiData(raw: RawApiResponse, uid: string): HardChallengeData {
  const challs: HardChallengeEntry[] = (raw.best?.challenge ?? []).map(c => ({
    name: c.name,
    monster: {
      level: c.monster.level,
      icon: c.monster.icon,
      desc: c.monster.desc.filter(d => d !== '')
    },
    second: c.second,
    avatars: (c.teams ?? []).map(a => ({
      avatar_id: a.avatar_id,
      name: a.name,
      level: a.level,
      rarity: a.rarity,
      rank: a.rank
    })),
    best_avatars: (c.best_avatar ?? []).map(a => ({
      avatar_id: a.avatar_id,
      dps: a.dps
    }))
  }));

  return {
    uid,
    has_data: raw.best?.best?.has_data ?? false,
    best: raw.best?.best ?? { difficulty: 0, second: 0, has_data: false },
    challs,
    schedule: {
      start_time: raw.schedule ? formatTimestamp(raw.schedule.start_time) : '',
      end_time: raw.schedule ? formatTimestamp(raw.schedule.end_time) : ''
    }
  };
}

// ─── 入口 ────────────────────────────────────────────

export default async (e: EventsEnum) => {
  const event = createEvent({
    event: e,
    selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
  });

  const [message] = useMessage(event);
  const userId = event.UserId;

  logger.debug('[hardChallenge] 进入', { userId });

  const result = await queryMihoyoApi({
    userId,
    game: 'gs',
    api: 'hardChallenge',
    query: { need_detail: true }
  });

  logger.debug('[hardChallenge] API 返回', { success: result.success, message: result.message });

  const format = Format.create();

  if (!result.success) {
    const md = Format.createMarkdown();

    md.addText(`[幽境危战] ${result.message}`);
    format.addMarkdown(md);
  } else {
    const cardData = transformApiData(result.data as RawApiResponse, result.uid ?? '');
    const img = await renderComponentIsHtmlToBuffer(HardChallengeCard, { data: cardData });

    format.addImage(img);
  }

  void message.send({ format });
};
