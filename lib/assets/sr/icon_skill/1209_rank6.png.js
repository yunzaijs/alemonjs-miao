const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1209_rank6-CK5bBhRq.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
