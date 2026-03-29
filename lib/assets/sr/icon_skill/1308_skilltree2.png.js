const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1308_skilltree2-bAEuBEwE.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
