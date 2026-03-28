const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../八重神子-C7F-ZjSB.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
