const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../114013-CTkEkI6_.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
