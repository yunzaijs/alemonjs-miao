const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1314_skilltree2-Ck9qG03P.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
