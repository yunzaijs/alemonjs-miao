import CalendarCard from '../../img/views/CalendarCard.js';
import { fetchCalendar } from '../../model/miao/calendar.js';
import { createEvent, useMessage, Format } from 'alemonjs';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

var calendar = async (e) => {
    const event = createEvent({
        event: e,
        selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
    });
    const [message] = useMessage(event);
    const game = e.miao?.game ?? 'gs';
    logger.debug('[calendar] 进入', { game });
    const data = await fetchCalendar(game);
    logger.debug('[calendar] fetchCalendar 结果', { hasData: !!data });
    if (!data) {
        const md = Format.createMarkdown();
        md.addText('日历数据获取失败，请稍后重试');
        const format = Format.create();
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const img = await renderComponentIsHtmlToBuffer(CalendarCard, { data });
    if (typeof img === 'boolean') {
        const md = Format.createMarkdown();
        md.addText('日历图片渲染失败，请稍后重试');
        const format = Format.create();
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const format = Format.create();
    format.addImage(img);
    void message.send({ format });
};

export { calendar as default };
