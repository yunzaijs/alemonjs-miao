const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1314_rank4-CQG2b0pj.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
