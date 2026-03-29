const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1112_skilltree3-CQqbFaAC.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
