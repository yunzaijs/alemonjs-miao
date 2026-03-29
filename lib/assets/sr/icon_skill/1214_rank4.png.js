const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1214_rank4-B86QEeq6.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
