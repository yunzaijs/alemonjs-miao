const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1301_skilltree3-DjppqVL2.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
