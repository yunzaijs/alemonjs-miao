const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1002_rank4-BkVOku6W.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
