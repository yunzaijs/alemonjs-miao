const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1218_skilltree3-COOy2YDI.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
