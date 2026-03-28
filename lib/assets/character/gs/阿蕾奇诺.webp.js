const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../阿蕾奇诺-DG9GBcOw.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
