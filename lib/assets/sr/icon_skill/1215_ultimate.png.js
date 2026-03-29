const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1215_ultimate-BGesS5vx.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
