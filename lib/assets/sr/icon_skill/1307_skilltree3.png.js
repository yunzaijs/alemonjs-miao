const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1307_skilltree3-DLQTKJXm.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
