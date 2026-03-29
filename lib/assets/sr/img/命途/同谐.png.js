const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../../同谐-CUkk7VXS.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
