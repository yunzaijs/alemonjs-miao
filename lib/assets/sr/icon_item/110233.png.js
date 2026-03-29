const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../110233-LT7o562H.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
