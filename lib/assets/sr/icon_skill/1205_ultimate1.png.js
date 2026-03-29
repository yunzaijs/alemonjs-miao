const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1205_ultimate1-xVt1e3zK.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
