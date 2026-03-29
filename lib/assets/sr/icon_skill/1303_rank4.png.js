const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1303_rank4-DKhg1uk_.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
