const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1206_ultimate1-MSEIS_WN.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
