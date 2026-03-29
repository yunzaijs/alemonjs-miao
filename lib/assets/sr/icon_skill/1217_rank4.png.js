const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1217_rank4-DB_ycZ97.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
