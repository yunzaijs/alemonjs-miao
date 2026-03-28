const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../银狼Pro-Dr6-_QZi.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
