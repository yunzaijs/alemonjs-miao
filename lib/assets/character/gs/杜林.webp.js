const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../杜林-BRCVMASp.webp', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
