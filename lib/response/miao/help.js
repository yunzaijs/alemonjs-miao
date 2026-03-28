import MiaoHelp from '../../img/views/MiaoHelp.js';
import { createEvent, useMessage, Format } from 'alemonjs';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

var help = async (e) => {
    const event = createEvent({
        event: e,
        selects: ['message.create', 'private.message.create']
    });
    const [message] = useMessage(event);
    const img = await renderComponentIsHtmlToBuffer(MiaoHelp, {});
    if (typeof img === 'boolean') {
        const md = Format.createMarkdown();
        md.addText('帮助图片渲染失败，请稍后重试');
        const format = Format.create();
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const format = Format.create();
    format.addImage(img);
    void message.send({ format });
};

export { help as default };
