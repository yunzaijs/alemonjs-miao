const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1222_rank6-pPvSz_zR.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
