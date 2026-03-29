const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../114012-B3_am95C.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
