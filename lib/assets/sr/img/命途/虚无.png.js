const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../../虚无-B2OlWBqY.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
