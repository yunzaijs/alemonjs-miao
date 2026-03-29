const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1307_basic_atk-ovB1iRfU.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
