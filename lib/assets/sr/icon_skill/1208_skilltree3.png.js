const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1208_skilltree3-nWjW50pV.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
