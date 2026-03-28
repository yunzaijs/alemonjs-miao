const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../千织-CFasBmxK.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
