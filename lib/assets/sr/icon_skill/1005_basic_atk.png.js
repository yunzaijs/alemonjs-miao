const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1005_basic_atk-DQ3q92ue.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
