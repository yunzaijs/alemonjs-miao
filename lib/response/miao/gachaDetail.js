import GachaDetailCard from '../../img/views/GachaDetailCard.js';
import { extractAuthKey, saveAuthKey, fetchAllGachaLogs, saveGachaLogs, getAuthKey, loadGachaLogs, analyzeGacha } from '../../model/miao/gachaLog.js';
import { createEvent, useMessage, Format } from 'alemonjs';
import { getUserMainUid } from 'alemonjs-mhy';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

function parseGachaType(text, game) {
    const msg = text.replace(/(!|！|\/|#|＃|喵喵|星铁|抽卡|记录|祈愿|分析|池)/g, '');
    if (game === 'sr') {
        if (/常驻/.test(msg)) {
            return 1;
        }
        if (/联动武器|武器联动|联动光锥|光锥联动/.test(msg)) {
            return 22;
        }
        if (/联动角色|角色联动/.test(msg)) {
            return 21;
        }
        if (/武器|光锥/.test(msg)) {
            return 12;
        }
        return 11;
    }
    if (/常驻/.test(msg)) {
        return 200;
    }
    if (/武器/.test(msg)) {
        return 302;
    }
    if (/集录/.test(msg)) {
        return 500;
    }
    return 301;
}
var gachaDetail = async (e) => {
    const event = createEvent({
        event: e,
        selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
    });
    const [message] = useMessage(event);
    const userId = event.UserId;
    const text = e.MessageText;
    const game = /星铁/.test(text) ? 'sr' : (e.miao?.game ?? 'gs');
    logger.debug('[gachaDetail] 进入', { userId, game });
    const uid = await getUserMainUid(userId, game);
    logger.debug('[gachaDetail] uid', { uid });
    if (!uid) {
        const md = Format.createMarkdown();
        md.addText('请先绑定UID: #绑定uid XXXXXXXXX');
        const format = Format.create();
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const type = parseGachaType(text, game);
    const authkey = extractAuthKey(text);
    if (authkey) {
        await saveAuthKey(uid, authkey);
        try {
            const items = await fetchAllGachaLogs(authkey, type, game);
            await saveGachaLogs(uid, game, type, items);
            const md = Format.createMarkdown();
            md.addText(`已获取 ${items.length} 条${game === 'sr' ? '跃迁' : '祈愿'}记录`);
            const fmt = Format.create();
            fmt.addMarkdown(md);
            void message.send({ format: fmt });
        }
        catch (err) {
            const md = Format.createMarkdown();
            md.addText(`获取记录失败: ${err instanceof Error ? err.message : '未知错误'}`);
            const fmt = Format.create();
            fmt.addMarkdown(md);
            void message.send({ format: fmt });
            return;
        }
    }
    const savedKey = await getAuthKey(uid);
    if (savedKey && !authkey) {
        try {
            const items = await fetchAllGachaLogs(savedKey, type, game);
            if (items.length > 0) {
                await saveGachaLogs(uid, game, type, items);
            }
        }
        catch {
        }
    }
    const items = await loadGachaLogs(uid, game, type);
    if (items.length === 0) {
        const md = Format.createMarkdown();
        md.addText('暂无抽卡记录。请私聊发送抽卡链接(含authkey)来绑定，或在消息中附带链接');
        const format = Format.create();
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const analysis = analyzeGacha(items, type, game);
    const cardData = {
        uid,
        game,
        analysis
    };
    const img = await renderComponentIsHtmlToBuffer(GachaDetailCard, { data: cardData });
    const format = Format.create();
    if (typeof img === 'boolean') {
        const md = Format.createMarkdown();
        md.addText('[抽卡记录] 图片渲染失败');
        format.addMarkdown(md);
    }
    else {
        format.addImage(img);
    }
    void message.send({ format });
};

export { gachaDetail as default };
