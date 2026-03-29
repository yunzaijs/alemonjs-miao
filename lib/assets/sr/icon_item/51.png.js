const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../51-69b3Setb.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
