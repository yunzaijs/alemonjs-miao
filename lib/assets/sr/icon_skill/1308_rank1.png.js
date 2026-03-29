const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1308_rank1-o5sZkp4I.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
