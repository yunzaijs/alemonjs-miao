const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1408_basic_atk-D5JB2s0w.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
