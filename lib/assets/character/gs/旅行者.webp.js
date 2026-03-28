const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../旅行者-BRZ8aPm1.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
