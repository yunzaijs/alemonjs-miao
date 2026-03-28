const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../叶洛亚-BYLt-63U.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
