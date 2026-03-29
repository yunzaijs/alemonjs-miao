import { createEvent, useMessage, Format } from 'alemonjs';
import { getUserMainUid, queryMihoyoApi } from 'alemonjs-mhy';

function parseStatType(text) {
    const msg = text.replace(/(!|！|\/|#|＃|喵喵|星铁|统计|分析|池)/g, '');
    if (/武器|光锥/.test(msg)) {
        return /联动/.test(msg) ? 'weapon_linkage' : 'weapon';
    }
    if (/角色/.test(msg)) {
        return /联动/.test(msg) ? 'char_linkage' : 'char';
    }
    if (/常驻/.test(msg)) {
        return 'normal';
    }
    if (/集录/.test(msg)) {
        return 'mix';
    }
    if (/全部/.test(msg)) {
        return 'all';
    }
    if (/版本/.test(msg)) {
        return 'version';
    }
    return 'up';
}
var gachaStat = async (e) => {
    const event = createEvent({
        event: e,
        selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
    });
    const [message] = useMessage(event);
    const userId = event.UserId;
    const text = e.MessageText;
    const game = /星铁/.test(text) ? 'sr' : (e.miao?.game ?? 'gs');
    logger.debug('[gachaStat] 进入', { userId, game });
    const uid = await getUserMainUid(userId, game);
    logger.debug('[gachaStat] uid', { uid });
    if (!uid) {
        const md = Format.createMarkdown();
        md.addText('请先绑定UID: #绑定uid XXXXXXXXX');
        const format = Format.create();
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const type = parseStatType(text);
    const result = await queryMihoyoApi({
        userId,
        game,
        api: 'gachaStat',
        query: { uid, type }
    });
    const format = Format.create();
    if (!result.success) {
        const md = Format.createMarkdown();
        md.addText(`UID:${uid} 暂无抽卡数据`);
        format.addMarkdown(md);
    }
    else {
        const data = result.data;
        if (data.image) {
            format.addImage(data.image);
        }
        else {
            const md = Format.createMarkdown();
            md.addText(data.summary ?? '暂无统计数据');
            format.addMarkdown(md);
        }
    }
    void message.send({ format });
};

export { gachaStat as default };
