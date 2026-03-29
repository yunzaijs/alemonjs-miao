const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1108_skilltree2-Bte8eV0b.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
