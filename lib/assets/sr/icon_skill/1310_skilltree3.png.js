const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1310_skilltree3-CJNCKW9E.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
