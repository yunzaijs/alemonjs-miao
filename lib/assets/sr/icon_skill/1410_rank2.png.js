const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1410_rank2-B4XS6Va0.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
