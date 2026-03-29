const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1004_rank2-DjTZyhOG.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
