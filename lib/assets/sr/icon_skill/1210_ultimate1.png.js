const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1210_ultimate1-2WLXuNXu.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
