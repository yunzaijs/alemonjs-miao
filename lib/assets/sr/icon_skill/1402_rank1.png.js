const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1402_rank1-YUbGDhhn.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
