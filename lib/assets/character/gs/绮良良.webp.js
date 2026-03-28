const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../绮良良-DuNFMmlf.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
