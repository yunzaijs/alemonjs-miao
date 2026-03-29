const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1301_ultimate-DYo7-IoS.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
