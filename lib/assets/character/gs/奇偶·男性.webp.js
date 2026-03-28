const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../奇偶·男性-DkN3jPcL.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
