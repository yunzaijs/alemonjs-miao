const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../71037-DrT4n716.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
