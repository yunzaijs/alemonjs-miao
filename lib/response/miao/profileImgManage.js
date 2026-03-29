import { createEvent, useMessage, Format } from 'alemonjs';
import { queryMihoyoApi } from 'alemonjs-mhy';

function parseImgAction(text) {
    const uploadMatch = text.match(/^(?:!|！|\/|#|＃)?\s*(?:喵喵)?(?:上传|添加)(.+?)(?:面板图)\s*$/);
    if (uploadMatch) {
        return { action: 'upload', charName: uploadMatch[1].trim() };
    }
    const deleteMatch = text.match(/^(?:!|！|\/|#|＃)?\s*(?:喵喵)?(?:移除|清除|删除)(.+?)(?:面板图)(\d+)\s*$/);
    if (deleteMatch) {
        return { action: 'delete', charName: deleteMatch[1].trim(), index: parseInt(deleteMatch[2], 10) };
    }
    const listMatch = text.match(/^(?:!|！|\/|#|＃)?\s*(?:喵喵)?(.+?)(?:面板图列表)\s*$/);
    if (listMatch) {
        return { action: 'list', charName: listMatch[1].trim() };
    }
    return { action: 'list', charName: '' };
}
var profileImgManage = async (e) => {
    const event = createEvent({
        event: e,
        selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
    });
    const [message] = useMessage(event);
    const userId = event.UserId;
    const text = e.MessageText;
    const game = e.miao?.game ?? 'gs';
    const { action, charName, index } = parseImgAction(text);
    logger.debug('[profileImgManage] 进入', { action, charName, index, game });
    if (!charName) {
        const format = Format.create();
        const md = Format.createMarkdown();
        md.addText('请输入角色名，如: #上传胡桃面板图');
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    switch (action) {
        case 'upload': {
            const result = await queryMihoyoApi({
                userId,
                game,
                api: 'profileImgUpload',
                query: { charName, images: e.MessageImages ?? [] }
            });
            const format = Format.create();
            const md = Format.createMarkdown();
            md.addText(result.success ? result.data.message : `[上传面板图] ${result.message}`);
            format.addMarkdown(md);
            void message.send({ format });
            return;
        }
        case 'delete': {
            const result = await queryMihoyoApi({
                userId,
                game,
                api: 'profileImgDelete',
                query: { charName, index }
            });
            const format = Format.create();
            const md = Format.createMarkdown();
            md.addText(result.success ? result.data.message : `[删除面板图] ${result.message}`);
            format.addMarkdown(md);
            void message.send({ format });
            return;
        }
        case 'list': {
            const result = await queryMihoyoApi({
                userId,
                game,
                api: 'profileImgList',
                query: { charName }
            });
            const format = Format.create();
            if (result.success) {
                const data = result.data;
                if (data.images && data.images.length > 0) {
                    for (const img of data.images) {
                        format.addImage(img);
                    }
                }
                else {
                    const md = Format.createMarkdown();
                    md.addText(data.message ?? `暂无${charName}的面板图`);
                    format.addMarkdown(md);
                }
            }
            else {
                const md = Format.createMarkdown();
                md.addText(`[面板图列表] ${result.message}`);
                format.addMarkdown(md);
            }
            void message.send({ format });
        }
    }
};

export { profileImgManage as default };
