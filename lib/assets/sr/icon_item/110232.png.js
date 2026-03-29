const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../110232-nt5BUbOz.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
