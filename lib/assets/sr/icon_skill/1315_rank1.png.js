const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1315_rank1-C_g6gKUj.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
