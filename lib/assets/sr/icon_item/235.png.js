const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../235-r_w8ipnX.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
