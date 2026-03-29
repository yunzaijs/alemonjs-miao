const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1106_ultimate-6OfKBU0I.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
