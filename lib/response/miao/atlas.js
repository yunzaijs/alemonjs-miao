import { getCharacterFace, GS_FACE, SR_FACE } from '../../assets/character/index.js';
import AtlasCard from '../../img/views/AtlasCard.js';
import { GS_CHARACTERS } from '../../model/miao/characters.js';
import { loadGsCharacter } from '../../model/miao/gsData.js';
import { loadSrCharacter, srPathIcon, srElementIcon, srStarIcon } from '../../model/miao/srData.js';
import { createEvent, useMessage, Format } from 'alemonjs';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

function parseAtlasName(text) {
    const match = text.match(/^(?:!|！|\/|#|＃)(.+?)图鉴$/);
    return match?.[1]?.trim() ?? '';
}
function detectGame(name) {
    if (name in GS_FACE) {
        return 'gs';
    }
    if (name in SR_FACE) {
        return 'sr';
    }
    return null;
}
function findGsCharMeta(name) {
    for (const [, meta] of Object.entries(GS_CHARACTERS)) {
        if (meta.name === name || meta.abbr === name) {
            return meta;
        }
    }
    return null;
}
var atlas = async (e, next) => {
    const event = createEvent({
        event: e,
        selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
    });
    const [message] = useMessage(event);
    const text = e.MessageText;
    const name = parseAtlasName(text);
    if (!name) {
        next();
        return;
    }
    const game = detectGame(name);
    if (!game) {
        next();
        return;
    }
    const gameLabel = game === 'sr' ? '星穹铁道' : '原神';
    const faceImg = getCharacterFace(game, name);
    const gsMeta = game === 'gs' ? findGsCharMeta(name) : null;
    const gsData = game === 'gs' ? loadGsCharacter(name) : null;
    const srData = game === 'sr' ? loadSrCharacter(name) : null;
    logger.debug('[atlas] 图鉴查询', { name, game });
    const cardData = {
        name,
        game,
        gameLabel,
        element: gsMeta?.element ?? srData?.element,
        rarity: gsMeta?.rarity ?? srData?.rarity,
        weaponType: gsMeta?.weaponType,
        faceImg,
        gsData: gsData ?? undefined,
        srData: srData ?? undefined,
        elementIcon: srData ? srElementIcon(srData.element) : undefined,
        pathIcon: srData ? srPathIcon(srData.path) : undefined,
        starIcon: srData ? srStarIcon() : undefined
    };
    const img = await renderComponentIsHtmlToBuffer(AtlasCard, { data: cardData });
    const format = Format.create();
    if (typeof img === 'boolean') {
        const md = Format.createMarkdown();
        md.addText(`[${gameLabel}图鉴] 图片渲染失败`);
        format.addMarkdown(md);
    }
    else {
        format.addImage(img);
    }
    void message.send({ format });
};

export { atlas as default };
