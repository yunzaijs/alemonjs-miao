const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../青雀-BdNM0cAm.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
