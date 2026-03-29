const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../110143-BS1Sq747.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
