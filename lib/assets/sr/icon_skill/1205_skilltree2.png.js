const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1205_skilltree2-CnEpzbo9.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
