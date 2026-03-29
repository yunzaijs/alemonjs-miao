const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1111_talent-C35q7IXr.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
