import { getCharacterFace } from '../../assets/character/index.js';
import BannerCard from '../../img/views/BannerCard.js';
import { hasCharInPool, getCharBannerRecords, getAllBannerStats } from '../../model/miao/bannerData.js';
import { GS_CHARACTERS } from '../../model/miao/characters.js';
import { createEvent, useMessage, Format } from 'alemonjs';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

function parseBannerQuery(text) {
    const match = text.match(/^(?:!|！|\/|#|＃)(?:原神|星铁)?(?:(?:四星|五星)?(?:角色|武器|光锥|up)?|(.+?))(?:复刻)?(?:统计|卡池|祈愿)$/);
    const game = /星铁|光锥/.test(text) ? 'sr' : 'gs';
    const charName = match?.[1]?.trim() ?? '';
    return { charName, game };
}
function findCharMeta(name) {
    for (const [, meta] of Object.entries(GS_CHARACTERS)) {
        if (meta.name === name || meta.abbr === name) {
            return meta;
        }
    }
    for (const [, meta] of Object.entries(GS_CHARACTERS)) {
        if (meta.name.includes(name) || name.includes(meta.name)) {
            return meta;
        }
    }
    return null;
}
var banner = async (e) => {
    const event = createEvent({
        event: e,
        selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
    });
    const [message] = useMessage(event);
    const text = e.MessageText;
    const { charName } = parseBannerQuery(text);
    logger.debug('[banner] 进入', { charName });
    let cardData;
    if (charName) {
        const meta = findCharMeta(charName);
        if (!meta || !hasCharInPool(meta.name)) {
            const format = Format.create();
            const md = Format.createMarkdown();
            md.addText(`未找到角色「${charName}」的卡池记录`);
            format.addMarkdown(md);
            void message.send({ format });
            return;
        }
        const records = getCharBannerRecords(meta.name);
        cardData = {
            mode: 'single',
            charName: meta.name,
            element: meta.element,
            rarity: meta.rarity,
            faceImg: getCharacterFace('gs', meta.name),
            records
        };
    }
    else {
        const stats = getAllBannerStats();
        const list = stats.map(s => {
            const meta = findCharMeta(s.name);
            return {
                name: s.name,
                element: meta?.element ?? '',
                rarity: meta?.rarity ?? 5,
                faceImg: getCharacterFace('gs', s.name),
                upCount: s.upCount,
                lastVersion: s.lastVersion,
                daysSince: s.daysSince
            };
        });
        cardData = {
            mode: 'all',
            list
        };
    }
    const img = await renderComponentIsHtmlToBuffer(BannerCard, { data: cardData });
    const format = Format.create();
    if (typeof img === 'boolean') {
        const md = Format.createMarkdown();
        md.addText('[卡池统计] 图片渲染失败');
        format.addMarkdown(md);
    }
    else {
        format.addImage(img);
    }
    void message.send({ format });
};

export { banner as default };
