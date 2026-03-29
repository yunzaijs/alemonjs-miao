const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1204_rank4-B_j-KKAL.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
