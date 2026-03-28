import ProfileListCard from '../../img/views/ProfileListCard.js';
import { fetchProfile } from '../../model/miao/enka.js';
import { createEvent, useMessage, Format } from 'alemonjs';
import { getUserMainUid } from 'alemonjs-mhy';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

var profileList = async (e) => {
    const event = createEvent({
        event: e,
        selects: ['message.create', 'private.message.create']
    });
    const [message] = useMessage(event);
    const userId = event.UserId;
    const game = e.miao?.game ?? 'gs';
    if (game === 'zzz') {
        const md = Format.createMarkdown();
        md.addText('绝区零暂不支持面板查询');
        const format = Format.create();
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const uidMatch = e.MessageText.match(/(\d{9,10})\s*$/);
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
    if (!profileData) {
        const md = Format.createMarkdown();
        md.addText('面板数据获取失败，请确认UID正确且角色已在游戏中展示');
        const format = Format.create();
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const img = await renderComponentIsHtmlToBuffer(ProfileListCard, {
        data: { ...profileData, game }
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

export { profileList as default };
