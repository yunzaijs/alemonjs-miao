const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1008_rank4-CmPZla-l.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
