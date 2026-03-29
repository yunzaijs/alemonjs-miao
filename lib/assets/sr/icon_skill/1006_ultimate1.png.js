const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1006_ultimate1-B0XLC2W-.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
