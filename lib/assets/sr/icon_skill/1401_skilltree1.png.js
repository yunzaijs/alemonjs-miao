const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1401_skilltree1-B6pbx_qh.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
