/**
 * 角色面板详情 — 单个角色的面板数据
 * 命令: #胡桃面板 / #希儿详情 / #角色名伤害
 */
import ProfileDetailCard from '@src/img/views/ProfileDetailCard';
import { fetchProfile } from '@src/model/miao/enka';
import { createEvent, EventsEnum, Format, useMessage } from 'alemonjs';
import { getUserMainUid } from 'alemonjs-mhy';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

export default async (e: EventsEnum) => {
  const event = createEvent({
    event: e,
    selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
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

  // 解析角色名：匹配 #XXX详情 / #XXX面板详情 / #XXX伤害
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

  // 获取 UID
  const uidMatch = text.match(/(\d{9,10})\s*$/);

  let uid = uidMatch?.[1] ?? null;

  logger.debug('[profileDetail] 进入', { userId, game, charName, uidFromMsg: uid });

  uid ??= await getUserMainUid(userId, game);

  logger.debug('[profileDetail] uid', { uid });

  if (!uid) {
    const md = Format.createMarkdown();

    md.addText('请先绑定UID: #绑定uid XXXXXXXXX');

    const format = Format.create();

    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  // 获取面板数据
  const profileData = await fetchProfile(uid, game);

  if (!profileData || profileData.avatars.length === 0) {
    const md = Format.createMarkdown();

    md.addText('面板数据获取失败，请确认角色已在游戏中展示');

    const format = Format.create();

    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  // 模糊匹配角色名 (名字/简称/包含)
  const matchChar = (av: (typeof profileData.avatars)[0]) => {
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
