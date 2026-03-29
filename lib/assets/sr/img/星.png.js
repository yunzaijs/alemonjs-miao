const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../星-II-Efzla.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
