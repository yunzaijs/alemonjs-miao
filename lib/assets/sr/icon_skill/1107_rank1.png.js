const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1107_rank1-Bb7iCxSv.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
