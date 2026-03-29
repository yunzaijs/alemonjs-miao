const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1104_skilltree2-D7-BYuvB.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
