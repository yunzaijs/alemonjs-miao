const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1308_rank6-BIJ840bV.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
