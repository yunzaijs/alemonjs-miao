const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1009_skilltree3-Cv1JD65s.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
