const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1100_talent-D8EJSrL4.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
