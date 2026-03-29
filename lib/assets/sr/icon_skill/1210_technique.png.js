const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1210_technique-Bgo2zGR8.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
