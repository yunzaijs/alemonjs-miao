const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1401_skilltree3-Dv8Z8HLi.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
