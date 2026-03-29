const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1221_basic_atk-KPjazbZR.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
