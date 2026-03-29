const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1303_ultimate1-C6V9A2Ig.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
