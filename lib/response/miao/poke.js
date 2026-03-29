import { createEvent, useMessage, Format } from 'alemonjs';
import { getUserMainUid, queryMihoyoApi } from 'alemonjs-mhy';

var poke = async (e) => {
    const event = createEvent({
        event: e,
        selects: ['notice.create', 'private.notice.create']
    });
    const [message] = useMessage(event);
    const userId = event.UserId;
    const game = 'gs';
    logger.debug('[poke] 进入', { userId });
    const uid = await getUserMainUid(userId, game);
    logger.debug('[poke] uid', { uid });
    if (!uid) {
        return;
    }
    logger.debug('[poke] 调用 queryMihoyoApi');
    const result = await queryMihoyoApi({
        userId,
        game,
        api: 'avatarWife',
        query: { relationType: false, action: 'card' }
    });
    const format = Format.create();
    if (result.success) {
        const data = result.data;
        if (data.image) {
            format.addImage(data.image);
        }
        else {
            const md = Format.createMarkdown();
            md.addText(data.name ? `[戳一戳] ${data.name}` : '暂无可展示的角色');
            format.addMarkdown(md);
        }
    }
    else {
        const md = Format.createMarkdown();
        md.addText(`[戳一戳] ${result.message}`);
        format.addMarkdown(md);
    }
    void message.send({ format });
};

export { poke as default };
