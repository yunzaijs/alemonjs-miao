const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1207_skilltree1-r0Btf9S4.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
