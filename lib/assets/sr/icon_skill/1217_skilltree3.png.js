const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1217_skilltree3-SSict8I1.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
