const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1415_skilltree2-BNF_VP8b.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
