const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1001_rank4-Ihf2x5Hp.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
