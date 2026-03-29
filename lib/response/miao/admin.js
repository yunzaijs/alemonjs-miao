import { createEvent, useMessage, Format } from 'alemonjs';
import { queryMihoyoApi } from 'alemonjs-mhy';

function parseAdminAction(text) {
    if (/喵喵(强制)?(更新图像|图像更新)$/.test(text)) {
        return { action: 'updateImage', params: { force: /强制/.test(text) ? '1' : '' } };
    }
    if (/喵喵(安装|(强制)?更新)(攻略|meta)资源$/.test(text)) {
        const mode = /meta/.test(text) ? 'meta' : 'strategy';
        const force = /强制/.test(text) ? '1' : '';
        const install = /安装/.test(text) ? '1' : '';
        const game = /星铁/.test(text) ? 'sr' : '';
        return { action: 'updateRes', params: { mode, force, install, game } };
    }
    if (/喵喵(强制)?更新$|更新(miao(-plugin)?)$/.test(text)) {
        return { action: 'updatePlugin', params: { force: /强制/.test(text) ? '1' : '' } };
    }
    if (/喵喵更新日志|更新日志miao/.test(text)) {
        return { action: 'updateLog', params: {} };
    }
    if (/喵喵背景帮助/.test(text)) {
        return { action: 'bgHelp', params: {} };
    }
    if (/喵喵api$/.test(text)) {
        return { action: 'apiInfo', params: {} };
    }
    const cfgMatch = text.match(/喵喵(.+?)?设置\s*(.+?)?\s*(.*)$/);
    if (cfgMatch) {
        return {
            action: 'config',
            params: {
                type: cfgMatch[1]?.trim() ?? '',
                key: cfgMatch[2]?.trim() ?? '',
                value: cfgMatch[3]?.trim() ?? ''
            }
        };
    }
    return { action: 'config', params: {} };
}
const BG_HELP_TEXT = [
    '【#喵喵背景设置帮助】',
    '#喵喵背景设置模式[0-4] — 设置默认背景模式',
    '#喵喵背景设置默认图[xxx.png] — 设置本地默认背景图',
    '#喵喵背景设置列表xxx — 设置面板列表背景图',
    '#喵喵背景设置面板xxx — 设置面板背景图',
    '#喵喵背景设置列表模糊[0-50] — 设置列表背景图模糊度',
    '#喵喵背景设置面板模糊[0-50] — 设置面板背景图模糊度'
].join('\n');
var admin = async (e) => {
    const event = createEvent({
        event: e,
        selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
    });
    const [message] = useMessage(event);
    const userId = event.UserId;
    const text = e.MessageText;
    const { action, params } = parseAdminAction(text);
    logger.debug('[admin] 进入', { userId, action, params });
    if (action === 'bgHelp') {
        const format = Format.create();
        const md = Format.createMarkdown();
        md.addText(BG_HELP_TEXT);
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const result = await queryMihoyoApi({
        userId,
        game: 'gs',
        api: `admin_${action}`,
        query: params
    });
    const format = Format.create();
    if (result.success) {
        const data = result.data;
        if (data.image) {
            format.addImage(data.image);
        }
        else {
            const md = Format.createMarkdown();
            md.addText(data.message ?? '操作成功');
            format.addMarkdown(md);
        }
    }
    else {
        const md = Format.createMarkdown();
        md.addText(`[管理] ${result.message}`);
        format.addMarkdown(md);
    }
    void message.send({ format });
};

export { admin as default };
