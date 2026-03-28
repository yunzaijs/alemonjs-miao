const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../杰帕德-V6WUANxV.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
