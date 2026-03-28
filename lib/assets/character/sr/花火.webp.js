const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../花火-T0SN3IvM.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
