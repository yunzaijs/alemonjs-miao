const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1207_rank2-CkqsC4mu.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
