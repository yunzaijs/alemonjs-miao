const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1312_rank1-Df4WX2yP.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
