const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1321_rank1-uBpnt69q.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
