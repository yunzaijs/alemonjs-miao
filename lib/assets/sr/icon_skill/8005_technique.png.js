const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../8005_technique-D1B6EwX3.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
