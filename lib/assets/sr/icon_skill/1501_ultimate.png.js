const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1501_ultimate-CMf4W3Z6.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
