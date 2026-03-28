const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../赛索斯-BKxRN_Hw.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
