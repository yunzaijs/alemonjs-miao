const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1305_ultimate1-BTYpGVnA.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
