const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../桑博-DGcNTXNo.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
