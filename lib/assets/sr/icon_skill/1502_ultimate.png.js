const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1502_ultimate-BOns-5m_.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
