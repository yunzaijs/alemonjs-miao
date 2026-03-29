const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1223_technique-DC3tbU6Q.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
