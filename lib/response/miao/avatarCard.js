import { createEvent, useMessage, Format } from 'alemonjs';
import { getUserMainUid, queryMihoyoApi } from 'alemonjs-mhy';

var avatarCard = async (e) => {
    const event = createEvent({
        event: e,
        selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
    });
    const [message] = useMessage(event);
    const userId = event.UserId;
    const game = e.miao?.game ?? 'gs';
    logger.debug('[avatarCard] 进入', { userId, game });
    const uid = await getUserMainUid(userId, game);
    logger.debug('[avatarCard] uid', { uid });
    if (!uid) {
        const md = Format.createMarkdown();
        md.addText('请先绑定UID: #绑定uid XXXXXXXXX');
        const format = Format.create();
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    logger.debug('[avatarCard] 调用 queryMihoyoApi', { api: 'avatarCard', uid });
    const result = await queryMihoyoApi({
        userId,
        game,
        api: 'avatarCard',
        query: { uid }
    });
    logger.debug('[avatarCard] API 返回', { success: result.success, message: result.message });
    const format = Format.create();
    if (!result.success) {
        const md = Format.createMarkdown();
        md.addText(`[角色卡片] ${result.message}`);
        format.addMarkdown(md);
    }
    else {
        const data = result.data;
        if (data.image) {
            format.addImage(data.image);
        }
        else {
            const md = Format.createMarkdown();
            md.addText(data.summary ?? '暂无角色卡片数据');
            format.addMarkdown(md);
        }
    }
    void message.send({ format });
};

export { avatarCard as default };
