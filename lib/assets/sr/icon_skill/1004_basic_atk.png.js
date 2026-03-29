const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1004_basic_atk-D54SFHIc.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
