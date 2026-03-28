const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../钟离-H-ufIvF4.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
