const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1001_rank2-DZTjGPd5.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
