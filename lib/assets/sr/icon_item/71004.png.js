const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../71004-S8-1mKNL.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
