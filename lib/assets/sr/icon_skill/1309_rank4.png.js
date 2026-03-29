const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1309_rank4-rDuUKdqL.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
