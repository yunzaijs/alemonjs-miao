const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../雷泽-DqMx0P6t.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
