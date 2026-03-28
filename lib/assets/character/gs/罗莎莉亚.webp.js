const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../罗莎莉亚-DYabl3HB.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
