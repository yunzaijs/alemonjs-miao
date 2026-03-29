const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1217_rank6-BM8eV1bk.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
