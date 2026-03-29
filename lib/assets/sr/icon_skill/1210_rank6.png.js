const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1210_rank6-Com5xJyn.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
