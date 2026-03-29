const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1221_skilltree2-n8PjX7k4.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
