const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1108_skilltree3-D2BrP0Fz.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
