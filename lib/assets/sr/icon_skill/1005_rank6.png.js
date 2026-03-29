const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1005_rank6-RaCw8Txi.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
