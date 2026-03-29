const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../8004_basic_atk-EA7-BctB.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
