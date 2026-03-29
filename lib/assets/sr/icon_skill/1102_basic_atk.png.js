const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1102_basic_atk-wDA9kg48.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
