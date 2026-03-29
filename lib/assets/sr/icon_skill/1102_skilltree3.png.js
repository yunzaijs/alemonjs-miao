const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1102_skilltree3-CXS8DRGc.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
