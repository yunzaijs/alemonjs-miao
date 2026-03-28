const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../琳妮特-DwpOVQ4L.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
