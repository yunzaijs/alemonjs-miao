const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1002_rank6-Ct-4KCUH.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
