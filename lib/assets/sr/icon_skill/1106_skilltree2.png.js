const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1106_skilltree2-Dw-yQIlI.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
