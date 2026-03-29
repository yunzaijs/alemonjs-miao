const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1221_rank1-B7H5n95X.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
