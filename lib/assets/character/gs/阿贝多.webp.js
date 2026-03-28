const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../阿贝多-S-XO2hiF.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
