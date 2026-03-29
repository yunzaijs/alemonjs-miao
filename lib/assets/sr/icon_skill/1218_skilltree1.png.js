const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1218_skilltree1-5EtRYXIC.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
