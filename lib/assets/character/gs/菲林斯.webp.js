const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../菲林斯-BrJTRgH9.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
