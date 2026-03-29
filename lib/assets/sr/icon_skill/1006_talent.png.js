const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1006_talent-D28cRkms.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
