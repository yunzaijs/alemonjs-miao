const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1213_rank1-C6GZchUg.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
