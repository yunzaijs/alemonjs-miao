const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1214_rank1-j5ERVAYd.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
