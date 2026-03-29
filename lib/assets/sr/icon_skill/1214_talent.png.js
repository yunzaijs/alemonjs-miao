const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1214_talent--5r8EDQk.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
