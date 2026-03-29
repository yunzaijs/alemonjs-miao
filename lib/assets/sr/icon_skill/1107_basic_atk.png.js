const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1107_basic_atk-uKmMiztz.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
