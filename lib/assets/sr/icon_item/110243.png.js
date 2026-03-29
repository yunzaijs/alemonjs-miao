const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../110243-Drmd9ogB.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
