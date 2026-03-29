const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1005_rank1-DM4RCVzg.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
