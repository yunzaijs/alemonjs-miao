const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1222_rank4-CZ4o4jMP.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
