const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../重云-78svM1xF.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
