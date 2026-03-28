import RankListCard from '../../img/views/RankListCard.js';
import { fetchProfile } from '../../model/miao/enka.js';
import { getRankConfig, submitAllRanks, getRankList } from '../../model/miao/profileRank.js';
import { createEvent, useMessage, Format } from 'alemonjs';
import { getUserMainUid } from 'alemonjs-mhy';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

function parseRankType(text) {
    if (/分|评分|圣遗物|遗器|ACE/.test(text)) {
        return 'mark';
    }
    if (/双爆|双暴/.test(text)) {
        return 'crit';
    }
    return 'mark';
}
var rankList = async (e) => {
    const event = createEvent({
        event: e,
        selects: ['message.create', 'private.message.create']
    });
    const [message] = useMessage(event);
    const userId = event.UserId;
    const game = e.miao?.game ?? 'gs';
    const text = e.MessageText;
    const guildId = e.GuildId;
    if (!guildId) {
        const md = Format.createMarkdown();
        md.addText('排名功能仅在群/频道内可用');
        const format = Format.create();
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    if (game === 'zzz') {
        const md = Format.createMarkdown();
        md.addText('绝区零暂不支持排名');
        const format = Format.create();
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const cfg = await getRankConfig(guildId);
    if (cfg.status === 1) {
        const md = Format.createMarkdown();
        md.addText('本群排名功能已关闭，管理员可使用 #开启排名 开启');
        const format = Format.create();
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const nameMatch = text.match(/^(?:!|！|\/|#|＃)*(原神|星铁)?\s*(.{1,10})\s*(?:分|评分|圣遗物|遗器|双爆|双暴|ACE)?\s*(?:排名|排行)(?:榜)?/);
    const charName = nameMatch?.[2]?.trim();
    if (!charName) {
        const md = Format.createMarkdown();
        md.addText('请输入角色名，如: #刻晴排行');
        const format = Format.create();
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const type = parseRankType(text);
    const uid = await getUserMainUid(userId, game);
    if (uid) {
        const profile = await fetchProfile(uid, game);
        if (profile) {
            await submitAllRanks(guildId, uid, profile.avatars);
        }
    }
    let charId = null;
    let charElement;
    if (uid) {
        const profile = await fetchProfile(uid, game);
        if (profile) {
            const matched = profile.avatars.find(av => av.name === charName || av.abbr === charName || av.name.includes(charName) || charName.includes(av.name) || charName.includes(av.abbr));
            if (matched) {
                charId = matched.id;
                charElement = matched.element;
            }
        }
    }
    if (!charId) {
        const md = Format.createMarkdown();
        md.addText(`未找到角色「${charName}」，请先使用 #更新面板 获取数据`);
        const format = Format.create();
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const entries = await getRankList(guildId, type, charId, cfg.number);
    const img = await renderComponentIsHtmlToBuffer(RankListCard, {
        data: { game, charName, charElement, type, entries }
    });
    if (typeof img === 'boolean') {
        const md = Format.createMarkdown();
        md.addText('排名图片渲染失败');
        const format = Format.create();
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const format = Format.create();
    format.addImage(img);
    void message.send({ format });
};

export { rankList as default };
