const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../8001_rank2-Pzqm3gfl.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
