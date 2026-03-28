const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../提纳里-Bh_fmciJ.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
