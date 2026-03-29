const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../8002_ultimate1-D1CUOeAr.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
