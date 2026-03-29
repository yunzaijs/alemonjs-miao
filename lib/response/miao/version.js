import VersionCard from '../../img/views/VersionCard.js';
import { createEvent, useMessage, Format } from 'alemonjs';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

var version = async (e) => {
    const event = createEvent({
        event: e,
        selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
    });
    const [message] = useMessage(event);
    logger.debug('[version] 进入');
    const cardData = {
        name: 'alemonjs-miao',
        version: '0.0.1',
        author: 'ningmengchongshui',
        description: 'Miao AlemonJS 版 — 原神/星铁多功能插件'
    };
    const img = await renderComponentIsHtmlToBuffer(VersionCard, { data: cardData });
    const format = Format.create();
    if (typeof img === 'boolean') {
        const md = Format.createMarkdown();
        md.addText('[版本信息] 图片渲染失败');
        format.addMarkdown(md);
    }
    else {
        format.addImage(img);
    }
    void message.send({ format });
};

export { version as default };
