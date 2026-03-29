const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../bg-electro-S2xM7xwt.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
