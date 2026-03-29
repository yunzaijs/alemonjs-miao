const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1214_rank6-CM6NhxVi.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
