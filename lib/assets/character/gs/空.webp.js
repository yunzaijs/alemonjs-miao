const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../空-B_pk4rsd.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
