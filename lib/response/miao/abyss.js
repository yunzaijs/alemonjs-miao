import { createEvent, useMessage, Format } from 'alemonjs';
import { queryMihoyoApi } from 'alemonjs-mhy';

function parsePeriod(text) {
    return /上期/.test(text) ? 2 : 1;
}
function parseFloor(text) {
    const match = text.match(/(\d{1,2})\s*$/);
    return match ? parseInt(match[1], 10) : undefined;
}
function parseAbyssGame(text) {
    if (/星铁|混沌|忘却/.test(text)) {
        return 'sr';
    }
    return 'gs';
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
    const floor = parseFloor(text);
    logger.debug('[abyss] 进入', { userId, game, period, floor });
    const result = await queryMihoyoApi({
        userId,
        game,
        api: 'spiralAbyss',
        query: { schedule_type: period, floor }
    });
    logger.debug('[abyss] API 返回', { success: result.success, message: result.message });
    const format = Format.create();
    if (!result.success) {
        const md = Format.createMarkdown();
        md.addText(`[深渊] ${result.message}`);
        format.addMarkdown(md);
    }
    else {
        const data = result.data;
        if (data.image) {
            format.addImage(data.image);
        }
        else {
            const md = Format.createMarkdown();
            md.addText(data.summary ?? '暂无深渊数据');
            format.addMarkdown(md);
        }
    }
    void message.send({ format });
};

export { abyss as default };
