const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../8001_ultimate-BAC5NdBf.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
