const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1211_skilltree1-D_fqulah.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
