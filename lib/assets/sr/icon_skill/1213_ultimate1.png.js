const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1213_ultimate1-DV3UIh5y.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
