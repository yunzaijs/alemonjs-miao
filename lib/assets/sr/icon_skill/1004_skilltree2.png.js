const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1004_skilltree2-JqI_wUNS.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
