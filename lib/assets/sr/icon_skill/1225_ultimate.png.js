const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1225_ultimate-CYw0wgTd.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
