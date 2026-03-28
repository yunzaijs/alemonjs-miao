const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../夜兰-8f34USys.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
