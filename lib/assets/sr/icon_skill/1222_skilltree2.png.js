const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1222_skilltree2-CbpZFIm8.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
