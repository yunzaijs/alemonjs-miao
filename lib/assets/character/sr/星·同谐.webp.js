const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../星·同谐-UzFh5r8i.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
