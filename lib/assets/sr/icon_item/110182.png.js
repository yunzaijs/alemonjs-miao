const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../110182-B1aCFnyC.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
