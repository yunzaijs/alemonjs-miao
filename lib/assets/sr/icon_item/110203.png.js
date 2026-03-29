const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../110203-C8ApKuWR.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
