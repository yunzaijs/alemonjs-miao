const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1201_ultimate1-RVIXJulR.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
