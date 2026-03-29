const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1001_basic_atk-Bdrf-I9P.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
