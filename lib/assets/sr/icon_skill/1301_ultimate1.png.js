const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1301_ultimate1-IXOehs3s.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
