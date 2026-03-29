import AdminSettingsCard from '../../img/views/AdminSettingsCard.js';
import { createEvent, useMessage, Format } from 'alemonjs';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

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
function mapCfgType(raw) {
    if (/面板|profile/.test(raw)) {
        return 'profile';
    }
    if (/排行|rank/.test(raw)) {
        return 'rank';
    }
    if (/系统|sys/.test(raw)) {
        return 'sys';
    }
    return '';
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
const UPDATE_LOG = ['【Miao AlemonJS 更新日志】', '', 'v0.0.1 — 初始版本', '· 全部卡片适配 AlemonJS + jsxp 渲染'].join('\n');
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
    if (action === 'updateLog') {
        const format = Format.create();
        const md = Format.createMarkdown();
        md.addText(UPDATE_LOG);
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    if (action === 'config') {
        const cfgType = mapCfgType(params.type ?? '');
        const cardData = { type: cfgType };
        const img = await renderComponentIsHtmlToBuffer(AdminSettingsCard, { data: cardData });
        const format = Format.create();
        if (typeof img === 'boolean') {
            const md = Format.createMarkdown();
            md.addText('[设置] 图片渲染失败');
            format.addMarkdown(md);
        }
        else {
            format.addImage(img);
        }
        void message.send({ format });
        return;
    }
    const actionLabels = {
        updatePlugin: '插件更新功能暂未实现',
        updateRes: '资源更新功能暂未实现',
        updateImage: '图像更新功能暂未实现',
        apiInfo: 'API信息功能暂未实现'
    };
    const format = Format.create();
    const md = Format.createMarkdown();
    md.addText(`[管理] ${actionLabels[action] ?? '未知操作'}`);
    format.addMarkdown(md);
    void message.send({ format });
};

export { admin as default };
