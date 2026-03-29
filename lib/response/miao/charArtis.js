import { GS_CHARACTERS } from '../../model/miao/characters.js';
import { createEvent, useMessage, Format } from 'alemonjs';

function parseCharName(text) {
    const match = text.match(/^(?:!|！|\/|#|＃)(?:原神|星铁)?(?:喵喵)?(.+?)(?:圣遗物|遗器)\s*\d*$/);
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
var charArtis = (e) => {
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
        md.addText('请输入角色名，如: #胡桃圣遗物\n或使用 #圣遗物列表 查看全部');
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const char = findCharByName(charName);
    logger.debug('[charArtis] 进入', { charName, found: !!char });
    if (!char) {
        const format = Format.create();
        const md = Format.createMarkdown();
        md.addText(`未找到角色「${charName}」，请检查名称`);
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const format = Format.create();
    const md = Format.createMarkdown();
    md.addText([
        `【${char.name} · 圣遗物评分】`,
        '',
        `请使用 #${char.name}面板 查看角色详细面板与圣遗物评分`,
        '或使用 #圣遗物列表 查看全部角色圣遗物总览',
        '',
        '提示: 需先绑定CK并更新面板数据'
    ].join('\n'));
    format.addMarkdown(md);
    void message.send({ format });
};

export { charArtis as default };
