const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1005_ultimate-4w8uE10W.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
