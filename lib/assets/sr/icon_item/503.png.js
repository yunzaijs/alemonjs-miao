const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../503-BYRAR_3v.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
