const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1203_basic_atk-CsAoPZi3.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
