const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1502_rank1-CpKfNLMn.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
