const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1121_rank1-CUn7rlma.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
