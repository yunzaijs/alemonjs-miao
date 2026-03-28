const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../那刻夏-BK72YIhb.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
