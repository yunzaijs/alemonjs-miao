const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1415_talent-C_wYkDzN.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
