const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1209_skilltree2-dM-N7EFj.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
