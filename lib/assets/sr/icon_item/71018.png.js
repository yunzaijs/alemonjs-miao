const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../71018-itZLx2te.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
