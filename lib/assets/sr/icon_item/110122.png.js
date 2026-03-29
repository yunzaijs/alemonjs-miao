const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../110122-CAoPV9UF.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
