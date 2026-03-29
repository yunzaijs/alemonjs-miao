const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../8002_skilltree3-C4rL5yrQ.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
