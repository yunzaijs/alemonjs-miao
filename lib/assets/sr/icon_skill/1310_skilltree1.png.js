const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1310_skilltree1-CIEBVYf2.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
