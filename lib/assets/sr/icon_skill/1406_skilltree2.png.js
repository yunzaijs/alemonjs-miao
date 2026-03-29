const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1406_skilltree2-DE9Bk_Vy.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
