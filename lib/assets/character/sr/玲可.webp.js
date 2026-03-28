const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../玲可-C9wAqWrH.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
