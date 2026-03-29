const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1210_skilltree2-DOoJhKMw.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
