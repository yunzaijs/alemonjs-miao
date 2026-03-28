const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../星·存护-BZhXeyDR.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
