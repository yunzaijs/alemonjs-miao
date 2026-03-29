const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../110202-BS8_OeQp.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
