const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../鹿野院平藏-DY0B0h6o.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
