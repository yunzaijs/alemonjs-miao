const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../110123-HVU2xpIY.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
