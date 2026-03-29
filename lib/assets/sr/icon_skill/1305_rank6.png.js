const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1305_rank6-CkjVb8f1.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
