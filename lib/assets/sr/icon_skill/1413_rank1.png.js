const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1413_rank1-5En_Ox0L.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
