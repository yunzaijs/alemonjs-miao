const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../115013-Meuxqoby.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
