const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../菲谢尔-BiN7wAfw.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
