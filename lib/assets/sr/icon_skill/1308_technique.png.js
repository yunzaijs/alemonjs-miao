const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1308_technique-C4HbTOqY.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
