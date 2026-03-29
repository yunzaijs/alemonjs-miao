const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1207_rank1-B5T7sBsN.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
