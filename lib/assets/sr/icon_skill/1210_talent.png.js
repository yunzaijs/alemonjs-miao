const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1210_talent-DjVJhKOY.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
