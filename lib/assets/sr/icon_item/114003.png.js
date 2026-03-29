const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../114003-CF3nJR5t.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
