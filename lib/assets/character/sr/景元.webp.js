const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../景元-ykKRrIJ0.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
