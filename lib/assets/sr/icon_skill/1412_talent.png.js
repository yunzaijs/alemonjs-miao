const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1412_talent-BG-nP23w.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
