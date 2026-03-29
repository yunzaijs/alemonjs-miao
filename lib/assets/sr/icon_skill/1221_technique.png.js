const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1221_technique-D_TIFFBW.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
