const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1502_skilltree3-rW4hqdme.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
