const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1407_rank6-C3i7M1va.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
