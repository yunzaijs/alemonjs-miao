const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1208_technique-CJs9vT7f.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
