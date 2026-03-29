const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1106_talent-D5_QN9AC.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
