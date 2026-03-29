const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../111011-DCeGLu2J.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
