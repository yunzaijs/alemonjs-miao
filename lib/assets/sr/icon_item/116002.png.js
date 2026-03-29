const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../116002-Q9jjAtCH.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
