const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../1401_skilltree2-Cf-jycr1.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
