const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1309_skilltree2-CQNoLGY_.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
