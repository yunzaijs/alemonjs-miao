const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../71034-C2B_-5FB.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
