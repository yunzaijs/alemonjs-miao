const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../icon-CyS7z9eq.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
