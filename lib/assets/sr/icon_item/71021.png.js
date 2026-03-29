const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../71021-yo4nsReA.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
