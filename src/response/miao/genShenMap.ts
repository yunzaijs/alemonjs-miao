/**
 * 地图资源查询 — 查询原神大地图资源位置
 * 命令: #甜甜花在哪里 / #刷新甜甜花在哪里
 */
import { createEvent, EventsEnum, Format, useMessage } from 'alemonjs';

/** 子地图别名映射 */
const SUB_MAP_ALIAS: Record<string, string[]> = {
  '&map_id=7': ['渊下宫', '渊下'],
  '&map_id=9': ['璃月地下', '层岩地下', '层岩']
};

function parseMapQuery(text: string): { name: string; refresh: boolean } | null {
  const match = text.match(/^(?:!|！|\/|#|＃)(刷新|更新)?(.+?)在(?:哪|那)(?:里)?$/);

  if (!match) {
    return null;
  }

  return {
    refresh: !!match[1],
    name: match[2]?.trim() ?? ''
  };
}

/** 解析子地图参数 */
function resolveSubMap(name: string): { resource: string; mapParam: string } {
  for (const [param, aliases] of Object.entries(SUB_MAP_ALIAS)) {
    const reg = new RegExp(aliases.join('|'), 'g');

    if (reg.test(name)) {
      return { resource: name.replace(reg, ''), mapParam: param };
    }
  }

  return { resource: name, mapParam: '' };
}

export default async (e: EventsEnum) => {
  const event = createEvent({
    event: e,
    selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
  });

  const [message] = useMessage(event);
  const text = e.MessageText;

  const query = parseMapQuery(text);

  if (!query?.name) {
    const md = Format.createMarkdown();

    md.addText('请输入资源名称，如: #甜甜花在哪里');

    const format = Format.create();

    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  const { resource, mapParam } = resolveSubMap(query.name);

  logger.debug('[genShenMap] 地图资源查询', { resource, mapParam, refresh: query.refresh });

  const url = `https://map.minigg.cn/map/get_map?resource_name=${encodeURIComponent(resource)}&is_cluster=false${mapParam}`;

  try {
    const res = await fetch(url, { method: 'get' });
    const contentType = res.headers.get('content-type') ?? '';

    // 如果返回 JSON，说明是错误信息
    if (contentType.includes('application/json')) {
      const json = await res.json();

      if (json.retcode === -1) {
        const format = Format.create();
        const md = Format.createMarkdown();

        md.addText(json.message ?? '未找到该资源');
        format.addMarkdown(md);
        void message.send({ format });

        return;
      }
    }

    // 返回图片数据
    const buffer = Buffer.from(await res.arrayBuffer());
    const format = Format.create();

    format.addImage(buffer);
    void message.send({ format });
  } catch (err) {
    logger.error('[genShenMap] 请求失败', err);

    const format = Format.create();
    const md = Format.createMarkdown();

    md.addText('[地图] 资源查询失败，请稍后重试');
    format.addMarkdown(md);
    void message.send({ format });
  }
};
