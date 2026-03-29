const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../110242-CT3yLmf1.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
