const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../8005_rank1-C4MASaRL.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
