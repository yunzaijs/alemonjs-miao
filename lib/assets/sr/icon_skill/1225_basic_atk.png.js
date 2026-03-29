const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1225_basic_atk-D8yaHdlP.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
