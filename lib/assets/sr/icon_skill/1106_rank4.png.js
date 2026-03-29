const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1106_rank4-Bclfjfg1.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
