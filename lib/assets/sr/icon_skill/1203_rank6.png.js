const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1203_rank6-ZSDYn_i6.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
