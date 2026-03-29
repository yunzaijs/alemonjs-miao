const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1100_rank4-C2D6x7CU.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
