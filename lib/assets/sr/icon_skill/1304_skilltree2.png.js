const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1304_skilltree2-CWdnuqK_.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
