const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1001_skilltree3-Cee10VCq.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
