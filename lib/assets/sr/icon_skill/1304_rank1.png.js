const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1304_rank1-DDc7ER0V.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
