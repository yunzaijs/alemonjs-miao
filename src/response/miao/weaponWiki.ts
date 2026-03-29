/**
 * 武器图鉴 — 查看武器详细信息
 * 命令: #天空之翼武器图鉴 / #天空之翼武器详情
 */
import WeaponWikiCard, { type WeaponWikiData } from '@src/img/views/WeaponWikiCard';
import { createEvent, EventsEnum, Format, useMessage } from 'alemonjs';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

/** 简易武器数据库（常见武器） */
const WEAPON_DB: Record<string, { rarity: number; weaponType: string }> = {
  天空之刃: { rarity: 5, weaponType: '单手剑' },
  天空之傲: { rarity: 5, weaponType: '双手剑' },
  天空之脊: { rarity: 5, weaponType: '长柄武器' },
  天空之翼: { rarity: 5, weaponType: '弓' },
  天空之卷: { rarity: 5, weaponType: '法器' },
  风鹰剑: { rarity: 5, weaponType: '单手剑' },
  磐岩结绿: { rarity: 5, weaponType: '单手剑' },
  雾切之回光: { rarity: 5, weaponType: '单手剑' },
  波乱月白经津: { rarity: 5, weaponType: '单手剑' },
  圣显之钥: { rarity: 5, weaponType: '单手剑' },
  裁叶萃光: { rarity: 5, weaponType: '单手剑' },
  静水流涌之辉: { rarity: 5, weaponType: '单手剑' },
  赦罪: { rarity: 5, weaponType: '单手剑' },
  狼的末路: { rarity: 5, weaponType: '双手剑' },
  松籁响起之时: { rarity: 5, weaponType: '双手剑' },
  赤角石溃杵: { rarity: 5, weaponType: '双手剑' },
  苇海信标: { rarity: 5, weaponType: '双手剑' },
  和璞鸢: { rarity: 5, weaponType: '长柄武器' },
  护摩之杖: { rarity: 5, weaponType: '长柄武器' },
  薙草之稻光: { rarity: 5, weaponType: '长柄武器' },
  息灾: { rarity: 5, weaponType: '长柄武器' },
  赤沙之杖: { rarity: 5, weaponType: '长柄武器' },
  阿莫斯之弓: { rarity: 5, weaponType: '弓' },
  终末嗟叹之诗: { rarity: 5, weaponType: '弓' },
  冬极白星: { rarity: 5, weaponType: '弓' },
  飞雷之弦振: { rarity: 5, weaponType: '弓' },
  猎人之径: { rarity: 5, weaponType: '弓' },
  若水: { rarity: 5, weaponType: '弓' },
  四风原典: { rarity: 5, weaponType: '法器' },
  尘世之锁: { rarity: 5, weaponType: '法器' },
  不灭月华: { rarity: 5, weaponType: '法器' },
  神乐之真意: { rarity: 5, weaponType: '法器' },
  千夜浮梦: { rarity: 5, weaponType: '法器' },
  图莱杜拉的回忆: { rarity: 5, weaponType: '法器' },
  碧落之珑: { rarity: 5, weaponType: '法器' }
};

function parseWeaponName(text: string): string {
  const match = text.match(/^(?:!|！|\/|#|＃)(?:星铁)?(?:喵喵)?(.+?)(?:武器|光锥)(?:详情|图鉴|说明|介绍)$/);

  return match?.[1]?.trim() ?? '';
}

export default async (e: EventsEnum) => {
  const event = createEvent({
    event: e,
    selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
  });

  const [message] = useMessage(event);
  const text = e.MessageText;
  const weaponName = parseWeaponName(text);

  if (!weaponName) {
    const format = Format.create();
    const md = Format.createMarkdown();

    md.addText('请输入武器名，如: #天空之翼武器图鉴');
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  logger.debug('[weaponWiki] 进入', { weaponName });

  // 查找武器
  const weaponInfo = WEAPON_DB[weaponName];

  const cardData: WeaponWikiData = {
    name: weaponName,
    rarity: weaponInfo?.rarity ?? 4,
    weaponType: weaponInfo?.weaponType ?? '未知'
  };

  const img = await renderComponentIsHtmlToBuffer(WeaponWikiCard, { data: cardData });
  const format = Format.create();

  if (typeof img === 'boolean') {
    const md = Format.createMarkdown();

    md.addText('[武器图鉴] 图片渲染失败');
    format.addMarkdown(md);
  } else {
    format.addImage(img);
  }

  void message.send({ format });
};
