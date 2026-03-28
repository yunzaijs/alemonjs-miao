const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../穹·同谐-CFpxTo1l.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
