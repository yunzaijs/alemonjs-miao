const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1217_ultimate1-Bk-crLnn.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
