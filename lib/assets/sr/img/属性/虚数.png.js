const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../../虚数-B24AARD5.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
