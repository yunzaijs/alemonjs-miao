const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../71038-BEZ6P8J6.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
