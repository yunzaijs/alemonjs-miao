import { getCharacterFace } from '../../assets/character/index.js';
import AbyssUsageCard from '../../img/views/AbyssUsageCard.js';
import { GS_CHARACTERS } from '../../model/miao/characters.js';
import { getAbyssRank } from '../../model/miao/lelaerApi.js';
import { createEvent, useMessage, Format } from 'alemonjs';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

function findCharMeta(name) {
    for (const [, meta] of Object.entries(GS_CHARACTERS)) {
        if (meta.name === name || meta.abbr === name) {
            return meta;
        }
    }
    return null;
}
var abyssUsage = async (e) => {
    const event = createEvent({
        event: e,
        selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
    });
    const [message] = useMessage(event);
    const text = e.MessageText;
    const mode = /幽境/.test(text) ? 'hard' : 'abyss';
    logger.debug('[abyssUsage] 进入', { mode });
    const result = await getAbyssRank(mode);
    if (!result?.data || result.data.length === 0) {
        const format = Format.create();
        const md = Format.createMarkdown();
        md.addText('[深渊使用率] 数据获取失败，请稍后重试');
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const list = result.data.map(item => {
        const meta = findCharMeta(item.name);
        return {
            name: item.name,
            element: meta?.element ?? '',
            rarity: meta?.rarity ?? 5,
            faceImg: getCharacterFace('gs', item.name),
            useRate: item.use_rate,
            rankClass: item.rank_class
        };
    });
    const title = mode === 'hard' ? '幽境危战使用率' : '深渊使用率';
    const cardData = {
        title,
        version: result.version ?? '',
        update: result.update ?? '',
        list
    };
    const img = await renderComponentIsHtmlToBuffer(AbyssUsageCard, { data: cardData });
    const format = Format.create();
    if (typeof img === 'boolean') {
        const md = Format.createMarkdown();
        md.addText(`[${title}] 图片渲染失败`);
        format.addMarkdown(md);
    }
    else {
        format.addImage(img);
    }
    void message.send({ format });
};

export { abyssUsage as default };
