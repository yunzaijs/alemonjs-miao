const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1314_rank2-BIL0h1kh.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
