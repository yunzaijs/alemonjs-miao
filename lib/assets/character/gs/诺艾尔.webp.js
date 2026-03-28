const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../诺艾尔-acCOt_CH.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
