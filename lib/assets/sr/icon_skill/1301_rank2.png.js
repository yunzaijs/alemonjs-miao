const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1301_rank2-B37m3ZeX.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
