const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1306_rank2-LZgIf171.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
