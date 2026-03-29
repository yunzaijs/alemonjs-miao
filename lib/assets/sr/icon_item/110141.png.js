const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../110141-Bm_6nLW7.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
