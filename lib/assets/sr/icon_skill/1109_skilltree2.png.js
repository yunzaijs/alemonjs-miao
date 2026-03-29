const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1109_skilltree2-C3z7f-6Z.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
