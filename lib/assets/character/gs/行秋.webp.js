const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../行秋-DHc8RHb8.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
