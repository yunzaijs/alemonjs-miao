/**
 * 图鉴查询 — 角色、武器、食物、怪物、圣遗物、道具等信息图鉴
 * 统一入口：通过角色名自动判断所属游戏（原神 / 星穹铁道）
 * 命令: #胡桃图鉴 / !希儿图鉴
 */
import { getCharacterFace, GS_FACE, SR_FACE } from '@src/assets/character/index.js';
import AtlasCard, { type AtlasCardData } from '@src/img/views/AtlasCard';
import { GS_CHARACTERS } from '@src/model/miao/characters.js';
import { loadSrCharacter, srElementIcon, srPathIcon, srStarIcon } from '@src/model/miao/srData.js';
import { createEvent, EventsEnum, Format, useMessage } from 'alemonjs';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

function parseAtlasName(text: string): string {
  const match = text.match(/^(?:!|！|\/|#|＃)(.+?)图鉴$/);

  return match?.[1]?.trim() ?? '';
}

/** 根据名称在原神/星铁角色库中查找，返回所属游戏 */
function detectGame(name: string): 'gs' | 'sr' | null {
  if (name in GS_FACE) {
    return 'gs';
  }

  if (name in SR_FACE) {
    return 'sr';
  }

  return null;
}

/** 从 GS_CHARACTERS 中按名称或简称查找角色元数据 */
function findGsCharMeta(name: string) {
  for (const [, meta] of Object.entries(GS_CHARACTERS)) {
    if (meta.name === name || meta.abbr === name) {
      return meta;
    }
  }

  return null;
}

export default async (e: EventsEnum, next: () => void) => {
  const event = createEvent({
    event: e,
    selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
  });

  const [message] = useMessage(event);
  const text = e.MessageText;

  const name = parseAtlasName(text);

  if (!name) {
    next();

    return;
  }

  const game = detectGame(name);

  if (!game) {
    // 未找到角色，放行给后续路由
    next();

    return;
  }

  const gameLabel = game === 'sr' ? '星穹铁道' : '原神';
  const faceImg = getCharacterFace(game, name);
  const gsMeta = game === 'gs' ? findGsCharMeta(name) : null;
  const srData = game === 'sr' ? loadSrCharacter(name) : null;

  logger.debug('[atlas] 图鉴查询', { name, game });

  const cardData: AtlasCardData = {
    name,
    game,
    gameLabel,
    element: gsMeta?.element ?? srData?.element,
    rarity: gsMeta?.rarity ?? srData?.rarity,
    weaponType: gsMeta?.weaponType,
    faceImg,
    srData: srData ?? undefined,
    elementIcon: srData ? srElementIcon(srData.element) : undefined,
    pathIcon: srData ? srPathIcon(srData.path) : undefined,
    starIcon: srData ? srStarIcon() : undefined
  };

  const img = await renderComponentIsHtmlToBuffer(AtlasCard, { data: cardData });
  const format = Format.create();

  if (typeof img === 'boolean') {
    const md = Format.createMarkdown();

    md.addText(`[${gameLabel}图鉴] 图片渲染失败`);
    format.addMarkdown(md);
  } else {
    format.addImage(img);
  }

  void message.send({ format });
};
