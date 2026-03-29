const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1202_rank1-BP8KK4xc.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
