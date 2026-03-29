const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1304_ultimate1-DnH_lM_q.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
