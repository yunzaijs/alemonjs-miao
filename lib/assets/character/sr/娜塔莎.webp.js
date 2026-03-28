const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../娜塔莎-C-ZbP0A7.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
