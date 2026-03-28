const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../菈乌玛-DbCJ7pum.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
