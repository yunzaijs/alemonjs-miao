const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1004_technique-CllI7sAj.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
