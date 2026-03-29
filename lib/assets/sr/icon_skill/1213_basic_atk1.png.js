const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1213_basic_atk1-DhsOsb7S.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
