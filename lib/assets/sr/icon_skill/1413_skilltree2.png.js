const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1413_skilltree2-BbLXCc0C.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
