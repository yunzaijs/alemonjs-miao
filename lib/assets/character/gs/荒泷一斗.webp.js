const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../荒泷一斗-BKhMwzxb.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
