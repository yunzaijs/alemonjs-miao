const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../83121-D-_5tWPf.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
