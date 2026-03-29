const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1313_rank1-D9Z8k_0c.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
