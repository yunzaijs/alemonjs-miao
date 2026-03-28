const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../寒鸦-CK-R6HYs.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
