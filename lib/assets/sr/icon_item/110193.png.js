const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../110193-cnCKKM1H.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
