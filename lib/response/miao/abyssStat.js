import { getCharacterFace } from '../../assets/character/index.js';
import AbyssStatCard from '../../img/views/AbyssStatCard.js';
import { GS_CHARACTERS } from '../../model/miao/characters.js';
import { getConsStat } from '../../model/miao/lelaerApi.js';
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
var abyssStat = async (e) => {
    const event = createEvent({
        event: e,
        selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
    });
    const [message] = useMessage(event);
    logger.debug('[abyssStat] 进入');
    const result = await getConsStat();
    if (!result?.data || result.data.length === 0) {
        const format = Format.create();
        const md = Format.createMarkdown();
        md.addText('[角色持有率] 数据获取失败，请稍后重试');
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
            holdRate: item.hold_rate,
            avgCons: item.avg_cons,
            cons: item.cons
        };
    });
    const cardData = {
        title: '角色持有率',
        version: result.version ?? '',
        update: result.update ?? '',
        list
    };
    const img = await renderComponentIsHtmlToBuffer(AbyssStatCard, { data: cardData });
    const format = Format.create();
    if (typeof img === 'boolean') {
        const md = Format.createMarkdown();
        md.addText('[角色持有率] 图片渲染失败');
        format.addMarkdown(md);
    }
    else {
        format.addImage(img);
    }
    void message.send({ format });
};

export { abyssStat as default };
