const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1314_talent-Ckz0FjUI.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
