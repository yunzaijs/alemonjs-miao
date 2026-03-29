import AvatarCard from '../../img/views/AvatarCard.js';
import { createEvent, useMessage, Format } from 'alemonjs';
import { getUserMainUid, queryMihoyoApi } from 'alemonjs-mhy';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

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
    logger.debug('[avatarCard] 调用 queryMihoyoApi', { api: 'character' });
    const result = await queryMihoyoApi({
        userId,
        game,
        api: 'character'
    });
    logger.debug('[avatarCard] API 返回', { success: result.success, message: result.message });
    const format = Format.create();
    if (!result.success) {
        const md = Format.createMarkdown();
        md.addText(`[角色卡片] ${result.message}`);
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const raw = result.data;
    const avatars = raw.avatars ?? [];
    if (avatars.length === 0) {
        const md = Format.createMarkdown();
        md.addText('未获取到角色数据，请确认米游社数据已公开');
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const cardData = {
        uid: result.uid ?? uid,
        game,
        title: '角色卡片',
        avatars
    };
    const img = await renderComponentIsHtmlToBuffer(AvatarCard, { data: cardData });
    if (typeof img === 'boolean') {
        const md = Format.createMarkdown();
        md.addText('[角色卡片] 图片渲染失败');
        format.addMarkdown(md);
    }
    else {
        format.addImage(img);
    }
    void message.send({ format });
};

export { avatarCard as default };
