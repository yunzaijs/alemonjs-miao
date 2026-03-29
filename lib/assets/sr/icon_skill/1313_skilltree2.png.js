const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1313_skilltree2-h6Ay8DOn.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
