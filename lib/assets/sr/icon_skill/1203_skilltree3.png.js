const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1203_skilltree3-DO0-CJgx.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
