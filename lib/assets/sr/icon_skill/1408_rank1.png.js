const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1408_rank1-Z5RF888G.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
