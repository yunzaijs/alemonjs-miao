const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../110153-Z8JFIuvB.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
