const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1205_rank4-Cv48cMz2.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
