const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../忘归人-B276ZInl.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
