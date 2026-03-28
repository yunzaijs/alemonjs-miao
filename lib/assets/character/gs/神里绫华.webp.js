const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../神里绫华-Du1KU_C5.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
