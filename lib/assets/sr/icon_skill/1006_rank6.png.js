const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1006_rank6-BGl-OkNZ.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
