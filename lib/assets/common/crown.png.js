const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../crown-Zp6FTVLj.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
