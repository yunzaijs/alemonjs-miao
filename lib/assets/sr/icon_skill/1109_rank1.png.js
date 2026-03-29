const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1109_rank1-BLZNUHT7.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
