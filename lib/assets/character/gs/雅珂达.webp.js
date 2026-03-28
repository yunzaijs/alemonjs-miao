const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../雅珂达-DMrVg3nI.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
