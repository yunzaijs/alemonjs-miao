const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1224_basic_atk-Bk8_e5h4.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
