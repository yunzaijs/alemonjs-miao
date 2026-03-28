/**
 * 圣遗物列表 — 显示所有角色的圣遗物评分
 * 命令: #圣遗物列表 / #遗器列表
 */
import ArtifactListCard from '@src/img/views/ArtifactListCard';
import { fetchProfile } from '@src/model/miao/enka';
import { createEvent, EventsEnum, Format, useMessage } from 'alemonjs';
import { getUserMainUid } from 'alemonjs-mhy';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

export default async (e: EventsEnum) => {
  const event = createEvent({
    event: e,
    selects: ['message.create', 'private.message.create']
  });

  const [message] = useMessage(event);
  const userId = event.UserId;
  const game = e.miao?.game ?? 'gs';

  if (game === 'zzz') {
    const md = Format.createMarkdown();

    md.addText('绝区零暂不支持圣遗物查询');

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

  if (!profileData || profileData.avatars.length === 0) {
    const md = Format.createMarkdown();

    md.addText('面板数据获取失败，请确认角色已在游戏中展示');

    const format = Format.create();

    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  const img = await renderComponentIsHtmlToBuffer(ArtifactListCard, {
    data: { game, uid, avatars: profileData.avatars }
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
