const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../8001_rank1-Dp-hlI1F.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
