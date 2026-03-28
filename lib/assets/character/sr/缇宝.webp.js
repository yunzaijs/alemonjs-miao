const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../缇宝-BoC5pfSc.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
