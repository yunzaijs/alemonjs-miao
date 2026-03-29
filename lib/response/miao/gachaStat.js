import GachaStatCard from '../../img/views/GachaStatCard.js';
import { extractAuthKey, saveAuthKey, fetchAllGachaLogs, saveGachaLogs, getAuthKey, analyzeAllGacha, SR_GACHA_TYPES, GS_GACHA_TYPES } from '../../model/miao/gachaLog.js';
import { createEvent, useMessage, Format } from 'alemonjs';
import { getUserMainUid } from 'alemonjs-mhy';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

var gachaStat = async (e) => {
    const event = createEvent({
        event: e,
        selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
    });
    const [message] = useMessage(event);
    const userId = event.UserId;
    const text = e.MessageText;
    const game = /星铁/.test(text) ? 'sr' : (e.miao?.game ?? 'gs');
    logger.debug('[gachaStat] 进入', { userId, game });
    const uid = await getUserMainUid(userId, game);
    logger.debug('[gachaStat] uid', { uid });
    if (!uid) {
        const md = Format.createMarkdown();
        md.addText('请先绑定UID: #绑定uid XXXXXXXXX');
        const format = Format.create();
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const authkey = extractAuthKey(text);
    if (authkey) {
        await saveAuthKey(uid, authkey);
        const types = game === 'sr' ? Object.keys(SR_GACHA_TYPES) : Object.keys(GS_GACHA_TYPES);
        for (const t of types) {
            try {
                const items = await fetchAllGachaLogs(authkey, Number(t), game);
                if (items.length > 0) {
                    await saveGachaLogs(uid, game, Number(t), items);
                }
            }
            catch {
                break;
            }
        }
    }
    const savedKey = await getAuthKey(uid);
    if (savedKey && !authkey) {
        const types = game === 'sr' ? Object.keys(SR_GACHA_TYPES) : Object.keys(GS_GACHA_TYPES);
        for (const t of types) {
            try {
                const items = await fetchAllGachaLogs(savedKey, Number(t), game);
                if (items.length > 0) {
                    await saveGachaLogs(uid, game, Number(t), items);
                }
            }
            catch {
                break;
            }
        }
    }
    const { analyses, totalCount, totalFive, totalFour } = await analyzeAllGacha(uid, game);
    if (totalCount === 0) {
        const md = Format.createMarkdown();
        md.addText('暂无抽卡记录。请私聊发送抽卡链接(含authkey)来绑定');
        const format = Format.create();
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const cardData = {
        uid,
        game,
        analyses,
        totalCount,
        totalFive,
        totalFour
    };
    const img = await renderComponentIsHtmlToBuffer(GachaStatCard, { data: cardData });
    const format = Format.create();
    if (typeof img === 'boolean') {
        const md = Format.createMarkdown();
        md.addText('[抽卡统计] 图片渲染失败');
        format.addMarkdown(md);
    }
    else {
        format.addImage(img);
    }
    void message.send({ format });
};

export { gachaStat as default };
