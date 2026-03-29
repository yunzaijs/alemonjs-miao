const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1314_ultimate1-DAJhKvCd.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
