const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1213_rank2-Bfg6Q1qU.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
