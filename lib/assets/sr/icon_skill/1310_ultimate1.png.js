const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1310_ultimate1-BzT3qoJt.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
