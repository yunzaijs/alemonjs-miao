const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../2-Dn1KkLFF.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
