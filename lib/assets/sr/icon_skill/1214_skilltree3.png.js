const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1214_skilltree3-D2lSriPl.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
