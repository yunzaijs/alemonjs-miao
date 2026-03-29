const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1317_basic_atk-BB1f_Gcj.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
