const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1209_basic_atk-CDj9M3W1.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
