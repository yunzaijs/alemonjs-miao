const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1401_talent-Bp4lGvwI.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
