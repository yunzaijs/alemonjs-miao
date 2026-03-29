const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../110407-D4GHbY1R.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
