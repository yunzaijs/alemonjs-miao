import GroupTopCard from '../../img/views/GroupTopCard.js';
import { fetchProfile } from '../../model/miao/enka.js';
import { getRankConfig, submitAllRanks, getGroupTop } from '../../model/miao/profileRank.js';
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
var groupTop = async (e) => {
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
    const nameMatch = text.match(/^(?:!|！|\/|#|＃)*(原神|星铁)?\s*(?:群|群内)?\s*(?:排名|排行)?\s*(?:最强|最高|最高分|最牛|第一|极限)\s*(.{1,10})/);
    const charName = nameMatch?.[2]?.trim();
    if (!charName) {
        const md = Format.createMarkdown();
        md.addText('请输入角色名，如: #最强刻晴');
        const format = Format.create();
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const type = parseRankType(text);
    const myUid = await getUserMainUid(userId, game);
    if (myUid) {
        const myProfile = await fetchProfile(myUid, game);
        if (myProfile) {
            await submitAllRanks(guildId, myUid, myProfile.avatars);
        }
    }
    let charId = null;
    if (myUid) {
        const myProfile = await fetchProfile(myUid, game);
        if (myProfile) {
            const matched = myProfile.avatars.find(av => av.name === charName || av.abbr === charName || av.name.includes(charName) || charName.includes(av.name) || charName.includes(av.abbr));
            if (matched) {
                charId = matched.id;
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
    const topEntry = await getGroupTop(guildId, type, charId);
    if (!topEntry) {
        const md = Format.createMarkdown();
        md.addText(`暂无「${charName}」的排名数据`);
        const format = Format.create();
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const topProfile = await fetchProfile(topEntry.uid, game);
    if (!topProfile) {
        const md = Format.createMarkdown();
        md.addText('获取最强用户面板失败');
        const format = Format.create();
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const avatar = topProfile.avatars.find(av => av.id === charId);
    if (!avatar) {
        const md = Format.createMarkdown();
        md.addText('最强用户面板中未找到该角色');
        const format = Format.create();
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const img = await renderComponentIsHtmlToBuffer(GroupTopCard, {
        data: { game, uid: topEntry.uid, avatar, rank: 1, type }
    });
    if (typeof img === 'boolean') {
        const md = Format.createMarkdown();
        md.addText('图片渲染失败');
        const format = Format.create();
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const format = Format.create();
    format.addImage(img);
    void message.send({ format });
};

export { groupTop as default };
