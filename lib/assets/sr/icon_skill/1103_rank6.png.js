const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1103_rank6-B_1cYgGw.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
