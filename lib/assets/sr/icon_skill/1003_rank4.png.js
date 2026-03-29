const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1003_rank4-DOEqXW74.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
