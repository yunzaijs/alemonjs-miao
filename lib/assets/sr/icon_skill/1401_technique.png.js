const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1401_technique-Dpm7Ue3y.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
