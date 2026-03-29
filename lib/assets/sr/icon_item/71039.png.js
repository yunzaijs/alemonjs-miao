const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../71039-Bx-4qQDa.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
