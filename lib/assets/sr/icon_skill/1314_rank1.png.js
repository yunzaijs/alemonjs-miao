const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1314_rank1-C-br1Ap5.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
