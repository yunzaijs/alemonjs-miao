const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1410_skilltree2-AVF1ejQC.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
