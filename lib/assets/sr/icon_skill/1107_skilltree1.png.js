const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1107_skilltree1-CBmzx7cF.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
