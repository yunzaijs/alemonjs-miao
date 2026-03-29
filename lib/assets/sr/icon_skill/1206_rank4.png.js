const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1206_rank4-Dyf4LHKN.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
