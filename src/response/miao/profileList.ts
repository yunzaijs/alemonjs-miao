/**
 * 面板列表 — 通过 Enka/Mihomo 获取角色面板汇总
 * 命令: #面板 / #更新面板 / #面板列表
 */
import ProfileListCard from '@src/img/views/ProfileListCard';
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

  if (game === 'zzz') {
    const md = Format.createMarkdown();

    md.addText('绝区零暂不支持面板查询');

    const format = Format.create();

    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  // 优先从消息中提取 UID，否则从 mhy 获取已绑定 UID
  const uidMatch = e.MessageText.match(/(\d{9,10})\s*$/);

  let uid = uidMatch?.[1] ?? null;

  logger.debug('[profileList] 进入', { userId, game, uidFromMsg: uid });

  uid ??= await getUserMainUid(userId, game);

  logger.debug('[profileList] uid', { uid });

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
