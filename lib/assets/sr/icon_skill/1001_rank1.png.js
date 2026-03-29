const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1001_rank1-Bb4jFAeu.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
