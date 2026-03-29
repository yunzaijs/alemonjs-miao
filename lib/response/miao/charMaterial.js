import { getCharacterFace } from '../../assets/character/index.js';
import CharMaterialCard from '../../img/views/CharMaterialCard.js';
import { GS_CHARACTERS } from '../../model/miao/characters.js';
import { createEvent, useMessage, Format } from 'alemonjs';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

function parseCharName(text) {
    const match = text.match(/^(?:!|！|\/|#|＃)(?:星铁|绝区零)?(?:喵喵)?(.+?)(?:素材|材料|升级材料)$/);
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
var charMaterial = async (e) => {
    const event = createEvent({
        event: e,
        selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
    });
    const [message] = useMessage(event);
    const text = e.MessageText;
    const charName = parseCharName(text);
    if (!charName) {
        const format = Format.create();
        const md = Format.createMarkdown();
        md.addText('请输入角色名，如: #胡桃素材');
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const char = findCharByName(charName);
    logger.debug('[charMaterial] 进入', { charName, found: !!char });
    if (!char) {
        const format = Format.create();
        const md = Format.createMarkdown();
        md.addText(`未找到角色「${charName}」，请检查名称`);
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const cardData = {
        name: char.name,
        abbr: char.abbr,
        element: char.element,
        rarity: char.rarity,
        weaponType: char.weaponType,
        faceImg: getCharacterFace('gs', char.name)
    };
    const img = await renderComponentIsHtmlToBuffer(CharMaterialCard, { data: cardData });
    const format = Format.create();
    if (typeof img === 'boolean') {
        const md = Format.createMarkdown();
        md.addText('[角色素材] 图片渲染失败');
        format.addMarkdown(md);
    }
    else {
        format.addImage(img);
    }
    void message.send({ format });
};

export { charMaterial as default };
