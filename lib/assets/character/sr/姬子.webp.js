const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../姬子-C3fD7Mba.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
