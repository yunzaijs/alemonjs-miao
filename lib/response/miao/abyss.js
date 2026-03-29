import AbyssCard from '../../img/views/AbyssCard.js';
import { createEvent, useMessage, Format } from 'alemonjs';
import { queryMihoyoApi } from 'alemonjs-mhy';
import dayjs from 'dayjs';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

function parsePeriod(text) {
    return /上期/.test(text) ? 2 : 1;
}
function parseAbyssGame(text) {
    if (/星铁|混沌|忘却/.test(text)) {
        return 'sr';
    }
    return 'gs';
}
function formatTs(ts) {
    const n = typeof ts === 'string' ? parseInt(ts, 10) : ts;
    return n > 0 ? dayjs.unix(n).format('MM/DD') : '';
}
var abyss = async (e) => {
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
    const raw = result.data;
    const start = formatTs(raw.start_time);
    const end = formatTs(raw.end_time);
    const cardData = {
        uid: result.uid ?? '',
        game,
        schedule_id: raw.schedule_id ?? 0,
        start_time: raw.start_time,
        end_time: raw.end_time,
        total_battle_times: raw.total_battle_times ?? 0,
        total_win_times: raw.total_win_times ?? 0,
        max_floor: raw.max_floor ?? '',
        total_star: raw.total_star ?? 0,
        is_unlock: raw.is_unlock ?? true,
        reveal_rank: raw.reveal_rank ?? [],
        damage_rank: raw.damage_rank ?? [],
        take_damage_rank: raw.take_damage_rank ?? [],
        defeat_rank: raw.defeat_rank ?? [],
        energy_skill_rank: raw.energy_skill_rank ?? [],
        normal_skill_rank: raw.normal_skill_rank ?? [],
        floors: raw.floors ?? [],
        period: start && end ? `${start} ~ ${end}` : period === 1 ? '本期' : '上期'
    };
    const img = await renderComponentIsHtmlToBuffer(AbyssCard, { data: cardData });
    if (typeof img === 'boolean') {
        const md = Format.createMarkdown();
        md.addText('[深渊] 图片渲染失败');
        format.addMarkdown(md);
    }
    else {
        format.addImage(img);
    }
    void message.send({ format });
};

export { abyss as default };
