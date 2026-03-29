const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1104_talent-BZQkRj2f.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
