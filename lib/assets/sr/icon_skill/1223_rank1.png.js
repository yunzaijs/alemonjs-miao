const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1223_rank1-hk_RZppk.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
