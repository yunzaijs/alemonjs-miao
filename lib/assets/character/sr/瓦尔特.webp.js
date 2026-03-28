const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../瓦尔特-F79DtS3X.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
