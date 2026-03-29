const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1208_rank1-bayG9QJ3.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
