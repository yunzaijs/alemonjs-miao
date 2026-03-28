const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../砂金-D40K1Hx6.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
