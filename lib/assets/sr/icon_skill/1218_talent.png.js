const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1218_talent-IdO13_CG.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
