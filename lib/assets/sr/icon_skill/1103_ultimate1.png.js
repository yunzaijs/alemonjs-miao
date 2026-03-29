const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1103_ultimate1-_i4KN81r.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
