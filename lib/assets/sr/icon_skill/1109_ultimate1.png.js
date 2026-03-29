const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1109_ultimate1-DPL3wUDb.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
