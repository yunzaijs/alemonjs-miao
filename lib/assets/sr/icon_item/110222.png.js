const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../110222-j7uSV6-5.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
