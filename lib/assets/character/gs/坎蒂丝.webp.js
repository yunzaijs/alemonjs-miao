const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../坎蒂丝-DEF291ou.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
