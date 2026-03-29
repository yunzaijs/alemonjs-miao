const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1306_skilltree2-D0iv2Ssn.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
