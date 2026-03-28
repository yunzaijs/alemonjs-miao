import { EventsEnum } from 'alemonjs';
import { resolveGame } from 'alemonjs-mhy';

/**
 * miao 局部中间件
 * 从 mhy 模块引入 resolveGame，挂载 e.miao 上下文供子路由使用
 */
export default (e: EventsEnum) => {
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
