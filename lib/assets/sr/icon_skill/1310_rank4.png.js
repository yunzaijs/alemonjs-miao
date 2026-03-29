const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1310_rank4-DhZQ_K7-.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
