const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1104_rank1-ZxU3iD3l.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
