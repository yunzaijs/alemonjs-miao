const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1223_basic_atk-Db3Yr1wN.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
