const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1407_skilltree2-1n_8EoLz.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
