const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1005_skilltree1-BCl4HQMS.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
