const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1101_basic_atk-B2vaNB62.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
