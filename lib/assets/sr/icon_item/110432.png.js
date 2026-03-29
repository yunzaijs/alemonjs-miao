const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../110432-C7iXkulV.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
