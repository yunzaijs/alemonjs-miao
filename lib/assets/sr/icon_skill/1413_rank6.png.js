const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1413_rank6-CCJqYHr5.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
