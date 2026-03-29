const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1101_rank2-eLdzcswP.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
