const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1104_ultimate1-B5cS0gur.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
