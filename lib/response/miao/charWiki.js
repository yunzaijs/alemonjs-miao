import { getCharacterFace } from '../../assets/character/index.js';
import CharWikiCard from '../../img/views/CharWikiCard.js';
import { GS_CHARACTERS } from '../../model/miao/characters.js';
import { createEvent, useMessage, Format } from 'alemonjs';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

function parseMode(text) {
    if (/命座|命之座|星魂/.test(text)) {
        return 'cons';
    }
    if (/天赋|技能|行迹/.test(text)) {
        return 'talent';
    }
    return 'wiki';
}
function parseCharName(text) {
    const match = text.match(/^(?:!|！|\/|#|＃)(?:星铁|绝区零)?(?:喵喵)?(.+?)(?:资料|图鉴|天赋|技能|行迹|命座|命之座|星魂)$/);
    return match?.[1]?.trim() ?? '';
}
function findCharByName(name) {
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
var charWiki = async (e, next) => {
    const event = createEvent({
        event: e,
        selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
    });
    const [message] = useMessage(event);
    const text = e.MessageText;
    const charName = parseCharName(text);
    if (!charName) {
        next();
        return;
    }
    const mode = parseMode(text);
    const char = findCharByName(charName);
    logger.debug('[charWiki] 进入', { charName, mode, found: !!char });
    if (!char) {
        next();
        return;
    }
    const cardData = {
        name: char.name,
        abbr: char.abbr,
        element: char.element,
        rarity: char.rarity,
        weaponType: char.weaponType,
        faceImg: getCharacterFace('gs', char.name),
        mode
    };
    const img = await renderComponentIsHtmlToBuffer(CharWikiCard, { data: cardData });
    const format = Format.create();
    if (typeof img === 'boolean') {
        const md = Format.createMarkdown();
        md.addText('[角色资料] 图片渲染失败');
        format.addMarkdown(md);
    }
    else {
        format.addImage(img);
    }
    void message.send({ format });
};

export { charWiki as default };
