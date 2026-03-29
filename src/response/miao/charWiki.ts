/**
 * 角色资料/图鉴 — 查看角色天赋、命座、资料
 * 命令: #胡桃资料 / #胡桃天赋 / #胡桃命座
 */
import { getCharacterFace } from '@src/assets/character/index.js';
import CharWikiCard, { type CharWikiData } from '@src/img/views/CharWikiCard';
import { GS_CHARACTERS } from '@src/model/miao/characters.js';
import { createEvent, EventsEnum, Format, useMessage } from 'alemonjs';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

type WikiMode = 'wiki' | 'talent' | 'cons';

function parseMode(text: string): WikiMode {
  if (/命座|命之座|星魂/.test(text)) {
    return 'cons';
  }

  if (/天赋|技能|行迹/.test(text)) {
    return 'talent';
  }

  return 'wiki';
}

function parseCharName(text: string): string {
  const match = text.match(/^(?:!|！|\/|#|＃)(?:星铁|绝区零)?(?:喵喵)?(.+?)(?:资料|图鉴|天赋|技能|行迹|命座|命之座|星魂)$/);

  return match?.[1]?.trim() ?? '';
}

/** 根据名称或简称查找角色 */
function findCharByName(name: string) {
  for (const [, meta] of Object.entries(GS_CHARACTERS)) {
    if (meta.name === name || meta.abbr === name) {
      return meta;
    }
  }

  // 包含匹配
  for (const [, meta] of Object.entries(GS_CHARACTERS)) {
    if (meta.name.includes(name) || name.includes(meta.name)) {
      return meta;
    }
  }

  return null;
}

export default async (e: EventsEnum) => {
  const event = createEvent({
    event: e,
    selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
  });

  const [message] = useMessage(event);
  const text = e.MessageText;

  const charName = parseCharName(text);

  if (!charName) {
    const md = Format.createMarkdown();

    md.addText('请输入角色名，如: #胡桃天赋');

    const format = Format.create();

    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  const mode = parseMode(text);
  const char = findCharByName(charName);

  logger.debug('[charWiki] 进入', { charName, mode, found: !!char });

  if (!char) {
    const format = Format.create();
    const md = Format.createMarkdown();

    md.addText(`未找到角色「${charName}」，请检查名称`);
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  const cardData: CharWikiData = {
    name: char.name,
    abbr: char.abbr,
    element: char.element,
    rarity: char.rarity,
    weaponType: char.weaponType,
    faceImg: getCharacterFace('gs', char.name),
    mode
  };

  const img = await renderComponentIsHtmlToBuffer(CharWikiCard, { data: cardData });
  const format = Format.create();

  if (typeof img === 'boolean') {
    const md = Format.createMarkdown();

    md.addText('[角色资料] 图片渲染失败');
    format.addMarkdown(md);
  } else {
    format.addImage(img);
  }

  void message.send({ format });
};
