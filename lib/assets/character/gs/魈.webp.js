const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../魈-jA4h8RD1.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
