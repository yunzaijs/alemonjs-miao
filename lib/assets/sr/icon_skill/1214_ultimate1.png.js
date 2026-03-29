const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1214_ultimate1-AjVp4E53.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
