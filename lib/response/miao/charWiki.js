import { createEvent, useMessage, Format } from 'alemonjs';
import { queryMihoyoApi } from 'alemonjs-mhy';

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
const MODE_LABELS = {
    wiki: '资料',
    talent: '天赋',
    cons: '命座'
};
var charWiki = async (e) => {
    const event = createEvent({
        event: e,
        selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
    });
    const [message] = useMessage(event);
    const text = e.MessageText;
    const game = e.miao?.game ?? 'gs';
    const charName = parseCharName(text);
    if (!charName) {
        const md = Format.createMarkdown();
        md.addText('请输入角色名，如: #胡桃天赋');
        const format = Format.create();
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const mode = parseMode(text);
    logger.debug('[charWiki] 进入', { charName, mode, game });
    const result = await queryMihoyoApi({
        userId: event.UserId,
        game,
        api: 'charWiki',
        query: { name: charName, mode }
    });
    logger.debug('[charWiki] API 返回', { success: result.success });
    const format = Format.create();
    if (!result.success) {
        const md = Format.createMarkdown();
        md.addText(`未找到角色「${charName}」的${MODE_LABELS[mode]}数据`);
        format.addMarkdown(md);
    }
    else {
        const md = Format.createMarkdown();
        const data = result.data;
        md.addTitle(`${charName} · ${MODE_LABELS[mode]}`);
        if (mode === 'wiki') {
            if (data.desc) {
                md.addText(String(data.desc));
            }
        }
        else if (mode === 'talent') {
            const talents = data.talents ?? [];
            for (const t of talents) {
                md.addSubtitle(t.name);
                md.addText(t.desc);
            }
        }
        else {
            const consList = data.cons ?? [];
            for (const c of consList) {
                md.addSubtitle(c.name);
                md.addText(c.desc);
            }
        }
        format.addMarkdown(md);
    }
    void message.send({ format });
};

export { charWiki as default };
