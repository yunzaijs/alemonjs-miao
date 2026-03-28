const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../长夜月-Bbr1rbZq.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
