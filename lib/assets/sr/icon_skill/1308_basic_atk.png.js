const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1308_basic_atk-DWoxZz8T.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
