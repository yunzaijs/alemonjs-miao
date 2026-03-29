import { createEvent, useMessage, Format } from 'alemonjs';
import { queryMihoyoApi, getUserMainUid } from 'alemonjs-mhy';

const RELATION_MAP = {
    wife: { keywords: ['老婆', '媳妇', '妻子', '娘子', '宝贝'], type: 0 },
    husband: { keywords: ['老公', '丈夫', '夫君', '郎君', '死鬼'], type: 1 },
    gf: { keywords: ['女朋友', '女友', '女神', '女王', '女票'], type: 0 },
    bf: { keywords: ['男朋友', '男友', '男神', '男票'], type: 1 },
    daughter: { keywords: ['女儿', '闺女', '小宝贝'], type: 2 },
    son: { keywords: ['儿子', '犬子'], type: 3 }
};
function findRelation(text) {
    for (const [key, cfg] of Object.entries(RELATION_MAP)) {
        if (cfg.keywords.some(k => text.includes(k))) {
            return { key, ...cfg };
        }
    }
    return undefined;
}
function parseAction(text) {
    if (/设置|选择|挑选|指定/.test(text)) {
        const param = text.replace(/^.*?(设置|选择|挑选|指定)\s*/, '').trim();
        return { action: 'set', param };
    }
    if (/添加/.test(text)) {
        const param = text.replace(/^.*?添加\s*/, '').trim();
        return { action: 'add', param };
    }
    if (/列表|是谁|是$|查询/.test(text)) {
        return { action: 'list', param: '' };
    }
    if (/照片|相片|写真|图像/.test(text)) {
        return { action: 'photo', param: '' };
    }
    return { action: 'card', param: '' };
}
var avatarWife = async (e) => {
    const event = createEvent({
        event: e,
        selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
    });
    const [message] = useMessage(event);
    const userId = event.UserId;
    const text = e.MessageText;
    const game = e.miao?.game ?? 'gs';
    logger.debug('[avatarWife] 进入处理', { userId, text, game });
    const relation = findRelation(text);
    if (!relation) {
        logger.debug('[avatarWife] 未匹配到关系词，跳过');
        return;
    }
    const { action, param } = parseAction(text);
    logger.debug('[avatarWife] 解析结果', {
        relationKey: relation.key,
        action,
        param
    });
    switch (action) {
        case 'card':
        case 'photo': {
            logger.debug('[avatarWife] card/photo 分支，查询uid', { userId, game });
            const uid = await getUserMainUid(userId, game);
            logger.debug('[avatarWife] getUserMainUid 结果', { uid });
            if (!uid) {
                logger.debug('[avatarWife] uid为空，提示绑定');
                const format = Format.create();
                const md = Format.createMarkdown();
                md.addText('请先绑定UID后再查看角色');
                format.addMarkdown(md);
                void message.send({ format });
                return;
            }
            logger.debug('[avatarWife] 调用 queryMihoyoApi', {
                api: 'avatarWife',
                relationType: relation.type,
                action
            });
            const result = await queryMihoyoApi({
                userId,
                game,
                api: 'avatarWife',
                query: { relationType: relation.type, action }
            });
            logger.debug('[avatarWife] API 返回', {
                success: result.success,
                message: result.message,
                hasData: !!result.data
            });
            const format = Format.create();
            if (!result.success) {
                const md = Format.createMarkdown();
                md.addText(`[${relation.keywords[0]}] ${result.message}`);
                format.addMarkdown(md);
            }
            else {
                const data = result.data;
                if (data.image) {
                    format.addImage(data.image);
                }
                else {
                    const md = Format.createMarkdown();
                    md.addText(data.name ? `你的${relation.keywords[0]}是 ${data.name}` : '未能找到适合展示的角色..');
                    format.addMarkdown(md);
                }
            }
            void message.send({ format });
            return;
        }
        case 'set':
        case 'add': {
            if (!param) {
                const format = Format.create();
                const md = Format.createMarkdown();
                md.addText(`请输入要${action === 'set' ? '设置' : '添加'}的角色名，多个角色用逗号分隔`);
                format.addMarkdown(md);
                void message.send({ format });
                return;
            }
            const names = param
                .replace(/[，、;；]/g, ',')
                .split(',')
                .filter(Boolean);
            const result = await queryMihoyoApi({
                userId,
                game,
                api: 'avatarWifeSet',
                query: {
                    relationType: relation.type,
                    relationKey: relation.key,
                    names,
                    append: action === 'add'
                }
            });
            const format = Format.create();
            const md = Format.createMarkdown();
            if (result.success) {
                const data = result.data;
                md.addText(`${relation.keywords[0]}已经设置：${data.list.join('，')}`);
            }
            else {
                md.addText(result.message);
            }
            format.addMarkdown(md);
            void message.send({ format });
            return;
        }
        case 'list': {
            const result = await queryMihoyoApi({
                userId,
                game,
                api: 'avatarWifeList',
                query: { relationKey: relation.key }
            });
            const format = Format.create();
            const md = Format.createMarkdown();
            if (result.success) {
                const data = result.data;
                if (data.list.length > 0) {
                    md.addText(`你的${relation.keywords[0]}是：${data.list.join('，')}`);
                }
                else {
                    md.addText(`尚未设置，发送 #${relation.keywords[0]}设置+角色名 来设置`);
                }
            }
            else {
                md.addText(result.message);
            }
            format.addMarkdown(md);
            void message.send({ format });
        }
    }
};

export { avatarWife as default };
