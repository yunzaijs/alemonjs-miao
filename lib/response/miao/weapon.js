import WeaponCard from '../../img/views/WeaponCard.js';
import { createEvent, useMessage, Format } from 'alemonjs';
import { queryMihoyoApi } from 'alemonjs-mhy';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

var weapon = async (e) => {
    const event = createEvent({
        event: e,
        selects: ['private.message.create', 'message.create']
    });
    const [message] = useMessage(event);
    const userId = event.UserId;
    const text = e.MessageText ?? '';
    logger.debug('[weapon] 进入', { userId, text });
    const result = await queryMihoyoApi({
        userId,
        game: 'gs',
        api: 'character',
        body: {}
    });
    const format = Format.create();
    if (!result.success) {
        const md = Format.createMarkdown();
        md.addText(`[武器] ${result.message}`);
        format.addMarkdown(md);
    }
    else {
        const data = result.data;
        const avatars = (data.list ?? data.avatars ?? []);
        const img = await renderComponentIsHtmlToBuffer(WeaponCard, {
            data: { uid: result.uid ?? '', avatars, filterText: text }
        });
        format.addImage(img);
    }
    void message.send({ format });
};

export { weapon as default };
