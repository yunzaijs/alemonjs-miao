const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1101_skilltree1-BV7IEAPg.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
