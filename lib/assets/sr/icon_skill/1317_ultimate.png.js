const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1317_ultimate-Dv22EnlP.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
