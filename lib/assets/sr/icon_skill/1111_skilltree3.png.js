const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1111_skilltree3-DFvEHAZf.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
