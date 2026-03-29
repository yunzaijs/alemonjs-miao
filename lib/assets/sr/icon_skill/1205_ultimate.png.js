const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1205_ultimate-G3u4QLQg.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
