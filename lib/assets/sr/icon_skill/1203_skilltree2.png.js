const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1203_skilltree2-M5IaFg8Z.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
