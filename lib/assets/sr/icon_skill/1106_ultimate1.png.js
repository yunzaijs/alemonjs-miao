const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1106_ultimate1-B56z7ql9.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
