const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../8007_rank2-jSrPYrLX.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
