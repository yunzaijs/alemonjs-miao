const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1009_rank1-D57cIIT5.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
