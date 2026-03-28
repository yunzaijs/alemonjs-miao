const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../菲米尼--9Zyk3sw.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
