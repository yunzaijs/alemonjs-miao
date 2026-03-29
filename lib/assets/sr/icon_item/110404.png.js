const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../110404-B3UoeT4o.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
