const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1109_skilltree1-A5_lpjx-.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
