const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1204_ultimate1-Dezv9Iyv.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
