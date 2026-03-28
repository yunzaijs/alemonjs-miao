const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../风堇-Cdf6T06D.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
