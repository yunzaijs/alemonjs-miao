const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1207_skilltree3-C3fMPkis.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
