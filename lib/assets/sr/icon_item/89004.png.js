const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../89001-Cmv63arN.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
