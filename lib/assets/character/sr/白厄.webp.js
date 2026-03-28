const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../白厄-B9KMxA1M.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
