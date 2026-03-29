const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1212_rank2-KAo3c_UP.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
