const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1004_rank4-B9CkTIvb.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
