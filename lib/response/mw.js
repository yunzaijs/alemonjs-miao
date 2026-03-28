import { resolveGame } from 'alemonjs-mhy';

var mw = (e) => {
    const text = e.MessageText ?? '';
    const game = resolveGame(text);
    Object.defineProperty(e, 'miao', {
        value: { game },
        writable: false,
        configurable: false,
        enumerable: true
    });
    return true;
};

export { mw as default };
