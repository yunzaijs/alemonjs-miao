const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1001_skilltree1-4QLT6q10.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
