const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../瓦雷莎-DYlZdIlP.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
