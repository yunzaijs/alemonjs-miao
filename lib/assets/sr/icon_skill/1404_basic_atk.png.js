const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1404_basic_atk-CEHzdPSa.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
