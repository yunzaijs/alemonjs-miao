const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../113002-BqZIC80N.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
