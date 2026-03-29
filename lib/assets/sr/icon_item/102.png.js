const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../102-CuK1Tde7.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
