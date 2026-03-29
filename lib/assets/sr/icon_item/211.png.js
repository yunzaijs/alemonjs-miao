const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../211-4Vzq22va.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
