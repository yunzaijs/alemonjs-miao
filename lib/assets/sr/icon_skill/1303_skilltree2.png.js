const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1303_skilltree2-BeGWm1JF.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
