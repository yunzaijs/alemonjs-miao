const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1406_rank2-DwoEB0W-.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
