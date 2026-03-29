const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1222_skilltree3-CMOfXne2.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
