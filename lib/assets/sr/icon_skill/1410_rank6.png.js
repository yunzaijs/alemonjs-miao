const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1410_rank6-fM69hRYc.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
