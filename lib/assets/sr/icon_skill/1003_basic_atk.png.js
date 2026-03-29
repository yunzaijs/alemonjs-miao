const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1003_basic_atk-B5O8uwEG.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
