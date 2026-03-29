const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1413_basic_atk-Byg2CkX0.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
