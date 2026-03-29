const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1006_skilltree2-0Ysw5uYJ.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
