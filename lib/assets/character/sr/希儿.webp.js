const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../希儿-jKW3SVXZ.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
