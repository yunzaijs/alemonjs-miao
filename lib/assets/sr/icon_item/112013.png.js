const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../112013-CRhxiHnf.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
