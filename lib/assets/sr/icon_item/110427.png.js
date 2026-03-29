const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../110427-Dn2oxrF8.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
