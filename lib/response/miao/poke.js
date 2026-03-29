import AvatarCard from '../../img/views/AvatarCard.js';
import { createEvent, useMessage, Format } from 'alemonjs';
import { getUserMainUid, queryMihoyoApi } from 'alemonjs-mhy';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

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
    logger.debug('[poke] 调用 queryMihoyoApi character');
    const result = await queryMihoyoApi({
        userId,
        game,
        api: 'character'
    });
    const format = Format.create();
    if (!result.success) {
        const md = Format.createMarkdown();
        md.addText(`[戳一戳] ${result.message}`);
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const raw = result.data;
    const avatars = raw.avatars ?? [];
    if (avatars.length === 0) {
        return;
    }
    const picked = avatars[Math.floor(Math.random() * avatars.length)];
    const cardData = {
        uid: result.uid ?? uid,
        game,
        title: '戳一戳',
        avatar: picked
    };
    const img = await renderComponentIsHtmlToBuffer(AvatarCard, { data: cardData });
    if (typeof img === 'boolean') {
        const md = Format.createMarkdown();
        md.addText(`[戳一戳] ${picked.name}`);
        format.addMarkdown(md);
    }
    else {
        format.addImage(img);
    }
    void message.send({ format });
};

export { poke as default };
