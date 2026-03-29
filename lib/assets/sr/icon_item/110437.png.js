const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../110437-Bz4R_t-o.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
