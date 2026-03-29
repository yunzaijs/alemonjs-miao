const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1015_skilltree3-DyjQZCPG.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
