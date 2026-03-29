const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1210_basic_atk-BAj_A-1q.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
