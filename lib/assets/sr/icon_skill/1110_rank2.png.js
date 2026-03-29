const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1110_rank2-C9Ue1cL_.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
