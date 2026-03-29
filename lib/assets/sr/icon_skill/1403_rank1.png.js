const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1403_rank1-D6xNMtuU.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
