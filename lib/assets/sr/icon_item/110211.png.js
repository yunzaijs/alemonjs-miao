const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../110211-ZDtk5e1b.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
