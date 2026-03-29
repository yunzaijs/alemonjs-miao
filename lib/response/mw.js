import { resolveGame } from 'alemonjs-mhy';

var mw = (e) => {
    const text = e.MessageText ?? '';
    logger.debug('[miao:mw] 收到消息', {
        userId: e.UserId,
        text,
        eventName: e.name
    });
    e.MessageText ??= '';
    const game = resolveGame(text);
    logger.debug('[miao:mw] 解析游戏', { game, text });
    Object.defineProperty(e, 'miao', {
        value: { game },
        writable: false,
        configurable: false,
        enumerable: true
    });
    return true;
};

export { mw as default };
