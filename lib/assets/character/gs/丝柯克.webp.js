const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../丝柯克-BOS7tfaX.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
