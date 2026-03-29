const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1307_skilltree2-CYVqm3HN.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
