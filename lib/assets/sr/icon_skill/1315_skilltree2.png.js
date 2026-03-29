const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1315_skilltree2-DL5QQ04o.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
