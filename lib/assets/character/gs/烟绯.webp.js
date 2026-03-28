const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../烟绯-CCPpWg2I.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
