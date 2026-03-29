const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../8001_technique-oEbGquAY.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
