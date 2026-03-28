const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../神里绫人-B3mkCcVC.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
