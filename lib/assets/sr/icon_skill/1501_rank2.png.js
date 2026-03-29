const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1501_rank2-Bk9p0CPt.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
