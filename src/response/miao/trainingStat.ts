/**
 * 练度统计 — 显示角色等级/命座/武器分布
 * 命令: #练度统计
 */
import TrainingStatCard from '@src/img/views/TrainingStatCard';
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

    md.addText('绝区零暂不支持练度统计');

    const format = Format.create();

    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  const uidMatch = e.MessageText.match(/(\d{9,10})\s*$/);

  let uid = uidMatch?.[1] ?? null;

  logger.debug('[trainingStat] 进入', { userId, game, uidFromMsg: uid });

  uid ??= await getUserMainUid(userId, game);

  logger.debug('[trainingStat] uid', { uid });

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

  const img = await renderComponentIsHtmlToBuffer(TrainingStatCard, {
    data: {
      game,
      uid,
      nickname: profileData.nickname,
      avatars: profileData.avatars
    }
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
