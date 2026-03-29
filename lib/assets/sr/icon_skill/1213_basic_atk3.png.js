const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1213_basic_atk3-Bejsa36M.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
