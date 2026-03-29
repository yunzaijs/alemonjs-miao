const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1103_skilltree3-BsPUHaPf.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
