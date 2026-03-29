const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1307_skilltree1-Coei3SYX.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
