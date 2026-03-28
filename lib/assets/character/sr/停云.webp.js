const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../停云-Bopfq7mG.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
