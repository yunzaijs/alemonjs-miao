const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1002_skilltree2-Ct7RLSF0.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
