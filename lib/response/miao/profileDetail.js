import ProfileDetailCard from '../../img/views/ProfileDetailCard.js';
import { fetchProfile } from '../../model/miao/enka.js';
import { createEvent, useMessage, Format } from 'alemonjs';
import { getUserMainUid } from 'alemonjs-mhy';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

var profileDetail = async (e) => {
    const event = createEvent({
        event: e,
        selects: ['message.create', 'private.message.create']
    });
    const [message] = useMessage(event);
    const userId = event.UserId;
    const game = e.miao?.game ?? 'gs';
    const text = e.MessageText;
    if (game === 'zzz') {
        const md = Format.createMarkdown();
        md.addText('绝区零暂不支持面板详情');
        const format = Format.create();
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const nameMatch = text.match(/^(?:!|！|\/|#|＃)*(.{1,10})\s*(?:详细|详情|面板|面板详情|伤害)/);
    const charName = nameMatch?.[1]?.trim();
    if (!charName) {
        const md = Format.createMarkdown();
        md.addText('请输入角色名，如: #胡桃详情');
        const format = Format.create();
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const uidMatch = text.match(/(\d{9,10})\s*$/);
    let uid = uidMatch?.[1] ?? null;
    uid ??= await getUserMainUid(userId, game);
    if (!uid) {
        const md = Format.createMarkdown();
        md.addText('请先绑定UID: #绑定uid XXXXXXXXX');
        const format = Format.create();
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const profileData = await fetchProfile(uid, game);
    if (!profileData || profileData.avatars.length === 0) {
        const md = Format.createMarkdown();
        md.addText('面板数据获取失败，请确认角色已在游戏中展示');
        const format = Format.create();
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const matchChar = (av) => {
        if (av.name === charName) {
            return true;
        }
        if (av.abbr === charName) {
            return true;
        }
        if (av.name.includes(charName)) {
            return true;
        }
        if (av.abbr.includes(charName)) {
            return true;
        }
        if (charName.includes(av.name)) {
            return true;
        }
        if (charName.includes(av.abbr)) {
            return true;
        }
        return false;
    };
    const avatar = profileData.avatars.find(matchChar);
    if (!avatar) {
        const names = profileData.avatars.map(a => a.name ?? a.abbr).join('、');
        const md = Format.createMarkdown();
        md.addText(`未找到角色「${charName}」的面板数据\n可查询: ${names}`);
        const format = Format.create();
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const img = await renderComponentIsHtmlToBuffer(ProfileDetailCard, {
        data: { game, uid, avatar }
    });
    if (typeof img === 'boolean') {
        const md = Format.createMarkdown();
        md.addText('面板图片渲染失败');
        const format = Format.create();
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const format = Format.create();
    format.addImage(img);
    void message.send({ format });
};

export { profileDetail as default };
