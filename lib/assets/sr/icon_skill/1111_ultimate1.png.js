const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1111_ultimate1-B376vi3x.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
