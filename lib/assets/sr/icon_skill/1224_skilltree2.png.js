const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1224_skilltree2-DqA3gzNS.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
