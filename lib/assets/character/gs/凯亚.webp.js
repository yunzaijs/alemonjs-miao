const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../凯亚-Cm8of4ee.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
