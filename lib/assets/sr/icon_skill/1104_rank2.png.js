const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1104_rank2-Dbl8C-R2.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
