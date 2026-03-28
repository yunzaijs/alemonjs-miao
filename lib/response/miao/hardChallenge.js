import HardChallengeCard from '../../img/views/HardChallengeCard.js';
import { createEvent, useMessage, Format } from 'alemonjs';
import { queryMihoyoApi } from 'alemonjs-mhy';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

function formatTimestamp(ts) {
    const d = new Date(ts * 1000);
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const hh = String(d.getHours()).padStart(2, '0');
    const mi = String(d.getMinutes()).padStart(2, '0');
    return `${mm}-${dd} ${hh}:${mi}`;
}
function transformApiData(raw, uid) {
    const challs = (raw.best?.challenge ?? []).map(c => ({
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
var hardChallenge = async (e) => {
    const event = createEvent({
        event: e,
        selects: ['message.create', 'private.message.create']
    });
    const [message] = useMessage(event);
    const userId = event.UserId;
    const result = await queryMihoyoApi({
        userId,
        game: 'gs',
        api: 'hardChallenge',
        query: { need_detail: true }
    });
    const format = Format.create();
    if (!result.success) {
        const md = Format.createMarkdown();
        md.addText(`[幽境危战] ${result.message}`);
        format.addMarkdown(md);
    }
    else {
        const cardData = transformApiData(result.data, result.uid ?? '');
        const img = await renderComponentIsHtmlToBuffer(HardChallengeCard, { data: cardData });
        format.addImage(img);
    }
    void message.send({ format });
};

export { hardChallenge as default };
