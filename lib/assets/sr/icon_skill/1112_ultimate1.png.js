const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1112_ultimate1-Cqg228nY.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
