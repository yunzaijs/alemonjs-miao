const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../71009-CZXT3qnU.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
