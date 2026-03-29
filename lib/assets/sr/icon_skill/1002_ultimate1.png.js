const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1002_ultimate1-PdeCP9g0.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
