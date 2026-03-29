const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1313_rank4-jKInsxlZ.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
