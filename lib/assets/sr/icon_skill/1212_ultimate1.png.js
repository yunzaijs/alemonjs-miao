const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1212_ultimate1-DrhtyBI6.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
