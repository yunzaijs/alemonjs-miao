const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1213_ultimate-HM4FV0yw.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
