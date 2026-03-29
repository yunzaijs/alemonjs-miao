const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../900001-cXG5pLqV.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
