const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../33-iN5s0wrV.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
