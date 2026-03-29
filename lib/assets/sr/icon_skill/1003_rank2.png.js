const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1003_rank2-Dqizn073.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
