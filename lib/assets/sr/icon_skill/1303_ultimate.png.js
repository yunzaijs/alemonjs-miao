const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1303_ultimate-BDusr7k5.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
