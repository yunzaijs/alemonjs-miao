const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1003_ultimate-CGB8iqVp.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
