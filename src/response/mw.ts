import { EventsEnum } from 'alemonjs';
import { resolveGame } from 'alemonjs-mhy';

/**
 * miao 局部中间件
 * 从 mhy 模块引入 resolveGame，挂载 e.miao 上下文供子路由使用
 */
export default (e: EventsEnum) => {
  const text = e.MessageText ?? '';

  logger.debug('[miao:mw] 收到消息', {
    userId: e.UserId,
    text,
    eventName: e.name
  });

  // 至少为空字符串，避免后续解析命令时出现 undefined 导致的错误
  e.MessageText ??= '';
  const game = resolveGame(text);

  logger.debug('[miao:mw] 解析游戏', { game, text });

  if (!Object.hasOwn(e, 'miao')) {
    Object.defineProperty(e, 'miao', {
      value: { game },
      writable: false,
      configurable: false,
      enumerable: true
    });
  }

  return true;
};
