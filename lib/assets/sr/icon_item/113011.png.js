const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../113011-DcN_Zb37.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
