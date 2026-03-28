const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../安柏-DojwIPpd.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
