const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../虎克-BdG8hBmq.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
