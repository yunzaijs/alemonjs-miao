const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1315_skilltree3-Mf3twND0.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
