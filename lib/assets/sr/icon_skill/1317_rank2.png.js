const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1317_rank2-mX5WSiA4.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
