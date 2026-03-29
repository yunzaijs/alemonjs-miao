const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../11-r4tQMjkA.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
