const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1201_rank6-CHrLUcek.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
