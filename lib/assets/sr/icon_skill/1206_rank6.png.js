const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1206_rank6-CQdwKrTw.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
