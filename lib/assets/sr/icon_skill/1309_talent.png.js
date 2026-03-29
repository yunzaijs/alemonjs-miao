const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1309_talent-CmjG8xSt.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
