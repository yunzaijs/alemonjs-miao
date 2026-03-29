const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1502_skilltree2-DEzxps6m.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
