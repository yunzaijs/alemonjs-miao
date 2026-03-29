const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1313_ultimate-Cc16y6Nr.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
