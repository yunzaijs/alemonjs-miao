const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../71024-Dn0_oQDU.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
