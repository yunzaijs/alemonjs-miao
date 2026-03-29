const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1104_skilltree1-C8aCTc4T.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
