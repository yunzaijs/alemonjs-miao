const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1120_basic_atk-Du6Kzu-P.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
