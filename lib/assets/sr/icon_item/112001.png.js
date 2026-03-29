const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../112001-7k-ALB0v.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
