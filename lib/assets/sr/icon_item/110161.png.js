const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../110161-okDPE_XY.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
