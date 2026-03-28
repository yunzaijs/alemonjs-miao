const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../大丽花-DOZ4X_oC.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
